const getToken = require('./apis/getToken')
const getRanking = require('./apis/getRanking')



// TODO 新增一个字段，可以自选top范围
module.exports = async (ctx) => {
    const yesterday = new Date().getTime() - 1000 * 60 * 60 * 24;
    const mode = ctx.query.ranking || 'day'
    const token = await getToken()
    const reponse = await getRanking(mode, new Date(ctx.query.date || yesterday), token);
    // response.illusts
    ctx.state.data = {
        illusts: response.illusts.map(item => ({

        }))
    }

}