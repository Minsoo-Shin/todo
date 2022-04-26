var express = require('express');
var router = express.Router();
var sql = require('../database/sql');
var authUser = require('./middles');

/* GET home page. */
router.get('/', authUser, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;