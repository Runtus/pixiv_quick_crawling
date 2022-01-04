const oss = require('ali-oss')
const key = require('./oss.json')

const client = new oss({
    accessKeyId : key.accessKeyId,
    accessKeySecret : key.accessKeySecret,
    bucket : "lao-lan-go",
    region:  "oss-cn-beijing"
});

client.useBucket('lao-lan-go')

module.exports = {
    oss: client
}