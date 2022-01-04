const fs = require('fs')
const getToken = require('./apis/getToken')
const getRanking = require('./apis/getRanking')
const getIllusts = require('./apis/getOssUrl')
const { timeFormatYMD } = require('@/helpers/time')
const cache = require('@/cache/cache.json')

class Illust {
    constructor(id, title, url) {
        this.id = id;
        this.title = title;
        this.url = url;
    }
}

const rankingCacheCheck = async (ctx, next) => {
    if (cache.time && cache.time === timeFormatYMD(new Date().getTime())) {
        ctx.body = {
            data: cache
        }
    } else {
        return next()
    }
}

const ranking = async (ctx, next) => {
    const yesterday = new Date().getTime() - 1000 * 60 * 60 * 24;
    const mode = ctx.query.ranking || 'day'
    const tokenResponse = await getToken()
    const response = await getRanking(mode, new Date(ctx.query.date || yesterday), tokenResponse.token);
    // response.illusts
    // TODO 新增一个字段，可以自选top范围，目前top范围为 top10
    const top = response.illusts.slice(0,10)
    const format = top.map(item =>
        new Illust(item.id, item.title, item.image_urls.large)
    )

    const promises = await Promise.all(format.map(item => getIllusts(item)))

    ctx.body = {
        data: {
            time: timeFormatYMD(new Date().getTime()),
            imageUrls: promises
        }
    }

    return next()
}

const rankingCacheRefresh = async (ctx) => {
    fs.writeFile('./src/cache/cache.json', JSON.stringify(ctx.body.data), err => {
        if (err) {
            console.error('写入数据失败')
        }
    })
}


module.exports = {
    ranking,
    rankingCacheCheck,
    rankingCacheRefresh
}