module.exports = function (router) {

  router.use(/\/reserve\/0-1-([0-99]+)/, (req, res, next) => {
  require(`./views/reserve/sprint-${req.params[0]}/routes`)(req, res, next);
})


}
