const Router = require('@koa/router')
const router = new Router()

const rankingIllusts = require('./lib/ranking')

router.get('/illusts', rankingIllusts)


module.exports = router