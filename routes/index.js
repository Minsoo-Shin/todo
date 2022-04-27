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
  res.send(result)
});

/* get todo (specified) */
router.get('/todos/:id', authUser, async function(req, res, next) {
  const result = await sql.getTodo(
    req.query.apikey,
    req.params.id,
  )
  res.send(result)
});

/* get todos */
router.get('/todos', authUser, async function(req, res, next) {
  const result = await sql.getTodoList(
    req.query.apikey,
  )
  res.send(result)
});

/* update todos (completed column) */
router.put('/todos/:id', authUser, async function(req, res, next) {
  const result = await sql.updateCompleted(
    req.query.apikey,
    req.params.id,
  )
  res.send(result)
});

/* delete todos */
router.delete('/todos/:id', authUser, async function(req, res, next) {
  console.log('id', req.params.id)
  const result = await sql.deleteTodo(
    req.query.apikey,
    req.params.id,
  )
  res.sendStatus(204)
});


module.exports = router;