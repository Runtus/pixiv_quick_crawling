const header = require('../requestHeader').maskHeader
const qs = require('qs')
const { request } = require('@/helpers/request')


module.exports = async function getRanking(mode, date, token) {
    const searchParams = qs.stringify({
        mode,
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    })

    const options = {
        method: 'get',
        url: `https://app-api.pixiv.net/v1/illust/ranking?${searchParams}`,
        headers: {
            ...header,
            Authorization: `Bearer ${token}`
        }
    }

    const response = await request(options)

    return response
}