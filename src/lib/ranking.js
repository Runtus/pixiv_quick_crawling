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
    const tops = ctx.query.tops || 10;
    if (cache.imageUrls && cache.imageUrls.length && !cache.imageUrls.some(item => item.id === 'error') && cache.time === timeFormatYMD(new Date().getTime())) {
        ctx.body = {
            pixiv: {
                time: cache.time,
                imageUrls: cache.imageUrls.slice(0, tops)
            }
        }

    } else {
        return next()
    }
}

const ranking = async (ctx, next) => {
    const timeStamp = new Date().getTime();
    const yesterday = timeStamp - 1000 * 60 * 60 * 24;
    const mode = ctx.query.ranking || 'day'
    const tops = ctx.query.tops || 10
    const tokenResponse = await getToken()
    const response = await getRanking(mode, new Date(ctx.query.date || yesterday), tokenResponse.token);
    console.log(response)
    // response.illusts
    // TODO 新增一个字段，可以自选top范围，目前top范围为 top10
    const format = response.illusts.map(item =>
        new Illust(item.id, item.title, item.image_urls.large)
    )

    const ossImages = await Promise.all(format.map(item => getIllusts(item)))

    ctx.writeJson = {
        imageUrls: ossImages,
        time: timeFormatYMD(timeStamp)
    }

    ctx.body = {
        pixiv: {
            time: timeFormatYMD(timeStamp),
            imageUrls: ossImages.slice(0, tops)
        }
    }

    return next()
}

const rankingCacheRefresh = async (ctx) => {
    fs.writeFile('./src/cache/cache.json', JSON.stringify(ctx.writeJson), err => {
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