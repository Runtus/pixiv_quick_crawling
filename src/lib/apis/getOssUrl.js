const { axios } = require('@/helpers/request')
const { oss } = require('@/helpers/oss')
const fs = require('fs')

const headers = {
    "Referer": 'https://app-api.pixiv.net/'
}

let num = 0;

/**
 * 
 * @param {{id: string, title: string, url: string}} imageMeta 
 */
module.exports = async (imageMeta) => {
    const options = {
        headers,
        url: imageMeta.url,
        responseType: "stream"
    }

    return await axios(options)
        .then(res => oss.put(`/pixiv/day/${imageMeta.id}.png`, res.data))
        .then(res => {
            return ({
                url: res.url,
                title: imageMeta.title,
                id: imageMeta.id
            })
        })
        .catch(err => {
            console.log(err)
            return {
                url: 'https://lao-lan-go.oss-cn-beijing.aliyuncs.com/404.png',
                title: '图片获取失败',
                id: 'error'
            }
        })
}