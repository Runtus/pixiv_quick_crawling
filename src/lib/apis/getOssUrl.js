const { axios } = require('@/helpers/request')
const { oss } = require('@/helpers/oss')
const fs = require('fs')

const headers = {
    "Referer": 'https://app-api.pixiv.net/'
}

/**
 * 
 * @param {{id: string, title: string, url: string}} imageMeta 
 */
module.exports = async (imageMeta) => {
    console.log(imageMeta)
    const options = {
        headers,
        url: imageMeta.url,
        responseType: "stream"
    }

    return axios(options)
        .then(res => oss.put(`/pixiv/day/${imageMeta.id}.png`, res.data))
        .then(res => ({
            url: res.url,
            title: imageMeta.title,
            id: imageMeta.title
        }))
}