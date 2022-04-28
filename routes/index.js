const express = require('express');
const router = express.Router();
const sql = require('../database/sql');
const isEmpty = require('./isEmpty');
const authUser = require('./middles');
const validate = require('./validate');
const _ = require('lodash');

/* create todos */
router.post('/todos', authUser, async function(req, res, next) {
  try {
    const check = await validate({req:req, 
                                  name:true, 
                                  completed:true, 
                                  limit:false, 
                                  skip:false,
                                  id:false});
    if (!check) return next(Error('Bad_Request'));
    // DB에 쿼리 요청
    const result = await sql.createTodo(
      req.query.apikey,
      req.body.name,
      req.body.completed,
      next
      )

    // 결과 반환
    return res.send(result)
  } catch (err) {
    console.log(err)
    next(Error(err))
  };
});

/* get todo (specified) */
router.get('/todos/:id', authUser, async function(req, res, next) {
  try {
    const check = await validate({req:req, 
                                  name:false,
                                  completed:false, 
                                  limit:false, 
                                  skip:false,
                                  id:true});
    if (!check) return next(Error('Bad_Request'));
    
    const result = await sql.getTodo(
      req.query.apikey,
      req.params.id,
    )
    // 게시글을 못 찾았을 경우
    if (isEmpty(result[0])) next(Error('Not_Found'))

    // 결과 반환
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
                                  skip:true,
                                  id:false});
    if (!check) return next(Error('Bad_Request'));
    
    const result = await sql.getTodoList(
      req.query.apikey,
      req.query.limit,
      req.query.skip,
    )
    // 결과 반환
    return res.send(result[0])

  } catch (err) {
    console.log(err);
    next(Error(err))
  }
});

/* update todos */
router.put('/todos/:id', authUser, async function(req, res, next) {
  try {
    const check = await validate({req:req, 
                                  name:true,
                                  completed:true, 
                                  limit:false, 
                                  skip:false,
                                  id:true});
    if (!check) return next(Error('Bad_Request'));

    const result = await sql.updateCompleted(
      req.query.apikey,
      req.params.id,
      req.body.name,
      req.body.completed,
      next
      );

    // 업데이트 내용 반환
    return res.send(result[0])

  } catch (err) {
    console.log(err);
    next(Error(err));
  }

});

/* delete todos */
router.delete('/todos/:id', authUser, async function(req, res, next) {
  try {
    console.log('id', req.params.id)
    const check = await validate({req:req, 
                                  name:false,
                                  completed:false, 
                                  limit:false, 
                                  skip:false,
                                  id:true});
    if (!check) return next(Error('Bad_Request'));
    const result = await sql.deleteTodo(
      req.query.apikey,
      req.params.id,
    );

    // 삭제 성공
    return res.sendStatus(204);

  } catch(err) {
    console.log(err);
    next(Error(err))
  }
});


module.exports = router;