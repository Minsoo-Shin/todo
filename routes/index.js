var express = require('express');
var router = express.Router();
var sql = require('../database/sql');
var authUser = require('./middles')


/* GET home page. */
router.get('/', authUser, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* create todos */ 
router.post('/todos', authUser, async function(req, res, next) {
  console.log(req.body)
  const result = await sql.createTodo(
    req.query.apikey,
    req.body.name,
    req.body.completed,
  )
  console.log('===',result[0])
  res.send(result)
});

module.exports = router;