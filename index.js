const module_alias = require('module-alias')
module_alias.addAlias('@', () => __dirname + '/src')

const Koa = require('koa')
const router = require('./src/router')

const app = new Koa()


app.use(router.routes());
app.use(router.allowedMethods());


app.listen(3000, () => {
    console.log('The Server is running at http://127.0.0.1:3000')
})