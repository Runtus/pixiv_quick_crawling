let { config } = require("./src/config")
let fs = require("fs");
let { crawlOriginUrl } = require("./lib/StorageLocalImage")
let { crawl } = require("./lib/GetImageId");


async function main() {
    let response = await crawl(); //获取爬取的数据
    if (config.ConfigFolder !== "" && !fs.existsSync(`./res/${config.ConfigFolder}`)) {
        fs.mkdirSync(`./res/${config.ConfigFolder}`);
    }
    if (config.ConfigFolder === "" && !fs.existsSync(`./res/${response.userName}`)) {
        fs.mkdirSync(`./res/${response.userName}`);
    }

    for (let i in response.illusts) {
        crawlOriginUrl(i, config.ConfigFolder, response.userName,response.listLength);
    }
}


main();