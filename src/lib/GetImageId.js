
let request = require("request");
let fs = require("fs");
let path = require("path");
let { config } = require("./../config")
let FetchToken = require("./../lib/FetchToken");
let getArray = require("./R18Works"); // 含R18作品请求
let R = request.defaults({ proxy: `http://${config.ConfigProxy}:${config.ConfigPort}` })


let config_total = {
    method: "GET",
    url: `https://www.pixiv.net/ajax/user/${config.ConfigAuthorId}/profile/all?lang=zh`
}

module.exports = {
    crawl: async function () {
        let json = JSON.parse(fs.readFileSync(path.join(__dirname, "../token.json")));
        
        if (config.ConfigisR18 && (json.token === "" || new Date().getTime() - json.time > 10 * 60 * 1000)) { // ios中 token 10分钟左右会过期，所以要随时更新token
            var token = await FetchToken();
            var data = await getArray(token);
        }
        else if (config.ConfigisR18 && json.token) {
            var data = await getArray(json.token);
        }
        return new Promise(((resolve, reject) => {
            if (config.ConfigisR18) { // R18需要认证
                try {
                    if (json.token === "" || new Date().getTime() - json.time > 10 * 60 * 1000) {
                        json.token = token;
                        json.time = new Date().getTime();
                        console.log(json);
                        fs.writeFileSync(path.join(__dirname, "./../token.json"), JSON.stringify(json));
                    }
                    resolve(data);
                }
                catch (err) {
                    reject(err);
                }
            }
            else {
                // 非R18 不需要登录状态
                R(config_total, (err, response) => {
                    if (err) {
                        console.log(err)
                        reject(err);
                    }
                    else {
                        resolve(JSON.parse(response.body).body);
                    }
                })
            }
        }))
    }
}