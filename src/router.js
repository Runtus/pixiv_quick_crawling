const Router = require("@koa/router");
const router = new Router();

const {
  rankingCacheCheck,
  ranking,
  rankingCacheRefresh,
} = require("./lib/ranking");

router.get("/illusts", rankingCacheCheck, ranking, rankingCacheRefresh);

module.exports = router;
