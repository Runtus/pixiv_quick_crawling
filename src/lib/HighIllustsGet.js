/***
 * @class DownloadConfig 
 * @description 下载高清图类
 * 
 * 
 */


class DownloadConfig{
    static method =  "GET";
    constructor(url) {
        this.url = url;
    }

    getConfig(){
        return {
            method : DownloadConfig.method,
            headers : {
                "Referer" : "https://app-api.pixiv.net/"
            },
            url : this.url
        }
    }
}


module.exports = {
    DownloadConfig
}