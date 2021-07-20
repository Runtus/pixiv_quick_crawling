// http请求token
const qs = require("qs");
const request = require("request");
const {config} = require("../config");
const { CLIENT_ID, CLIENT_SECRET, refresh_token } = require("./../const/client")

// 模拟headers
let headers = {
    "User-Agent" : "PixivAndroidApp/5.0.234 (Android 11; Pixel 5)",
    "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8",
}

let body = qs.stringify({
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "grant_type": "refresh_token",
            "include_policy": "true",
            "refresh_token": refresh_token,
})


let options = {
    method: 'post',
    url: 'https://oauth.secure.pixiv.net/auth/token',
    headers,
    body,
    proxy : `http://${config.ConfigProxy}:${config.ConfigPort}`
}


module.exports = function(){
    return new Promise((resolve,reject) => {
        request(options,(err,res) => {
            if(err){
                reject(err);
            }else{
              console.log(res.body)
                resolve((JSON.parse(res.body)).access_token);
            }
        })
    })
}
