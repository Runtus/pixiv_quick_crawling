let request = require("request");
let queryString = require("qs");
let { config } = require("./../config");

let R = request.defaults({ proxy: `http://${config.ConfigProxy}:${config.ConfigPort}` });
let array = [];


const maskHeader = {
    'App-OS': 'ios',
    'App-OS-Version': '10.3.1',
    'App-Version': '6.7.1',
    'User-Agent': 'PixivIOSApp/6.7.1 (iOS 10.3.1; iPhone8,1)',
}



let config_requst = {
    method: 'get',
    url: `https://app-api.pixiv.net/v1/user/illusts?user_id=${config.ConfigAuthorId}`,
    headers: {
        ...maskHeader
    },
    searchParams: queryString.stringify({
        "filter": 'for_ios',
        "type": 'illust',
    }),
}



// 递归爬取 
function getWorks(url, token, resolve, reject) {
    config_requst.url = url;
    R(config_requst, (err, res) => {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            let body = JSON.parse(res.body);
            let url = body.next_url;
            let illusts = body.illusts;
            if (url) {
                array = array.concat(illusts);
                getWorks(url, token, resolve, reject);
            } else {
                array = array.concat(illusts);
                let data = {
                    illusts: {

                    }
                }
                for (let i of array) {
                    data.illusts[i.id] = null;
                }
                data.userName = array[0].user.name; // 作者名挂载
                data.listLength = array.length;
                array = []; //array回归
                resolve(data);
            }
        }
    });
}


module.exports = async function (token) {
    console.log('hello')
    config_requst.headers.Authorization = 'Bearer ' + token;
    const url = `https://app-api.pixiv.net/v1/user/illusts?user_id=${config.ConfigAuthorId}`;
    return new Promise((resolve, reject) => {
        getWorks(url, token, resolve, reject);
    })
}


