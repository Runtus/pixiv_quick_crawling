const oss = require('ali-oss')

const client = new oss({
    accessKeyId : "LTAI4FskGErR3Y576ZUSEzT6",
    accessKeySecret : "NpcnD4JuKIt0IR275uVSzHLLVsLMCy",
    bucket : "lao-lan-go",
    region:  "oss-cn-beijing"
});

client.useBucket('lao-lan-go')

module.exports = {
    oss: client
}