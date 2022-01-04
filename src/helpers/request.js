const request = require('request')
const axios = require('axios')
const { config: { ConfigProxy } } = require('../config')
const R = request.defaults({ proxy: ConfigProxy })



module.exports = {
    request: (options) => {
        return new Promise((resolve, reject) => {
            R(options, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    let formatBody 
                    try {
                        formatBody = JSON.parse(res.body)
                    } catch (err) {
                        formatBody = res.body
                    }
                    resolve(formatBody)
                }
            })
        })
    },
    axios: (options) => axios({
        // TODO: proxy代理后面会和request统一
        proxy: {
            host: '127.0.0.1',
            port: 7890
        },
        ...options
    })
}