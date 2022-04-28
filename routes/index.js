var express = require('express');
var router = express.Router();
var sql = require('../database/sql');
const isEmpty = require('./isEmpty');
var authUser = require('./middles');
const validate = require('./validate');
const _ = require('lodash');

/* create todos */
router.post('/todos', authUser, async function(req, res, next) {
  try {
    const check = await validate({req:req, name:true, completed:true, limit:false, skip:false});
    if (!check) return next(Error('Bad_Request'));

    const result = await sql.createTodo(
      req.query.apikey,
      req.body.name,
      req.body.completed,
      next
      )
    // 변경 내용이 없음
    if (!result[0]) return next(Error('Not_modified'))

    return res.send(result)
  } catch (err) {
    console.log('/==',err,'/==',)
    next(Error(err))
  };
});

/* get todo (specified) */
router.get('/todos/:id', authUser, async function(req, res, next) {
  try {
    const result = await sql.getTodo(
      req.query.apikey,
      req.params.id,
    )
    // 게시글을 못 찾았을 경우
    if (isEmpty(result[0])) next(Error('Not_Found'))

    // 특정 게시글 객체 반환
    return res.send(result[0])

  } catch(err) {
    console.log(err);
    next(Error(err))
  }
});

/* get todos */
router.get('/todos', authUser, async function(req, res, next) {
  try {
    const check = await validate({req:req, 
                                  name:false,
                                  completed:false, 
                                  limit:true, 
                                  skip:true});
    if (!check) return next(Error('Bad_Request'));
    
    const result = await sql.getTodoList(
      req.query.apikey,
      req.query.limit,
      req.query.skip,
    )
    // 찾은 값 반환
    return res.send(result[0])

  } catch (err) {
    console.log(err);
    next(Error(err))
  }
});

/* update todos (completed column) */
router.put('/todos/:id', authUser, async function(req, res, next) {
  try {
    const result = await sql.updateCompleted(
      req.query.apikey,
      req.params.id,
      );
      // 변경 내용이 없음
      if (!result[0].affectedRows) next(Error('Not_modified'))

      // 업데이트 내용 반환
      return res.send(result)

  } catch (err) {
    console.log(err);
    next(Error(err));
  }

});

/* delete todos */
router.delete('/todos/:id', authUser, async function(req, res, next) {
  try {
    console.log('id', req.params.id)
    const result = await sql.deleteTodo(
      req.query.apikey,
      req.params.id,
    );
    // 변경 내용이 없음
    if (!result[0].affectedRows) next(Error('Not_modified'))

    // 삭제 성공
    return res.sendStatus(204);

  } catch(err) {
    console.log(err);
    next(Error(err))
  }
});


module.exports = router;