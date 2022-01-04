// http请求token
const qs = require("qs");
const headers = require('@/lib/requestHeader').maskHeader
const { request } = require('@/helpers/request')



const CLIENT_ID = "MOBrBDS8blbauoSck0ZfDbtuzpyT"
const CLIENT_SECRET = "lsACyCD94FhDUtGTXi3QzcFE2uU1hqtDaKeqrdwj"
const hash_secret = "28c1fdd170a5204386cb1313c7077b34f83e4aaf4aa829ce78c231e05b0bae2c"
const REFRESH_TOKEN = 'ai3ox2_na-XIKx94aokPxohSpiC3paTBPXnIWfepj0A'


let body = qs.stringify({
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            hash_secret,
            "get_secure_url": 1,
            "grant_type": "refresh_token",
            "include_policy": "true",
            "refresh_token": REFRESH_TOKEN,
})


let options = {
    method: 'post',
    url: 'https://oauth.secure.pixiv.net/auth/token',
    headers,
    body
}

module.exports = async () => {
    const response = await request(options)
    return {
        expires: response.expires_in,
        token: response.access_token
    }
}
