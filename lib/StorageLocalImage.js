let request = require("request");
let fs = require("fs");
let { config } = require("./../config")
let cheerio = require("cheerio");
let R = request.defaults({ proxy: `http://${config.ConfigProxy}:${config.ConfigPort}` })
let { DownloadConfig } = require("./HighIllustsGet");
var log = require('single-line-log').stdout;

class ArtworkConfig {
    static method = "GET";
    constructor(id) {
        this.url = "https://www.pixiv.net/artworks/" + id;
    }

    getConfig() {
        return {
            method: ArtworkConfig.method,
            url: this.url
        }
    }
}


// 计数器
let count = 0;
module.exports = {
    crawlOriginUrl : async function(id , configFolder , defaultFolder ,length){
        let folder = "";
        if(configFolder === ""){ // 缺省状态
            folder = defaultFolder;
        }else{
            folder = configFolder;
        }
        let config_req = new ArtworkConfig(id).getConfig();
        R(config_req, (err, response) => {
            if (err) {
                console.log(err);
            }
            else {
                let $ = cheerio.load(response.body);
                let dataString = $("#meta-preload-data").attr("content");
                let originUrl = JSON.parse(dataString).illust[id].urls.original;
                let downloadConfig = new DownloadConfig(originUrl).getConfig();
                R(downloadConfig,(err,res) => {
                    if(err){
                       console.log(err); 
                    }
                    else{
                        count++;
                        log(`已下载${((count/(length))*100).toFixed(2)}%, 一共有${length}张原画。`)
                    }
                }).pipe(fs.createWriteStream(`./res/${folder}/${id}.png`));
                
            }
        })
    }
    
}