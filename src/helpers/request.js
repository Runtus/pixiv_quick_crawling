const request = require('request')
const { config: { ConfigProxy } } = require('../config')
const R = request.defaults({ proxy: ConfigProxy})


module.exports = (options) => {
    return new Promise((resolve, reject) => {
        R(options, (err, res) => {
            if (err) {
                reject(err)
            } else {
                const formatBody = JSON.parse(res.body)
                resolve(formatBody)
            }
        })
    })
}