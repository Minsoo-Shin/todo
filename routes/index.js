var express = require('express');
var router = express.Router();
var sql = require('../database/sql');
const isEmpty = require('./isEmpty');
var authUser = require('./middles');


/* create todos */
router.post('/todos', authUser, async function(req, res, next) {
  try {
    const result = await sql.createTodo(
      req.query.apikey,
      req.body.name,
      req.body.completed,
      )
      // 변경 내용이 없음
      console.log('??',result)
      if (!result[0].affectedRows){
        return res.json({
          'status': 304,
          'error': 'not modified',
        });
      };
      return res.send(result)
  } catch (err ) {
    console.log(err)
    res.json({
      'status': err,
      'error': err.message,
  });
}
});

/* get todo (specified) */
router.get('/todos/:id', authUser, async function(req, res, next) {
  const result = await sql.getTodo(
    req.query.apikey,
    req.params.id,
  )
  if (isEmpty(result[0])){
    return res.json({
      'status': 404,
      'error': '해당 게시글을 찾지 못했습니다.'
    })
  }
  return res.send(result)
});

/* get todos */
router.get('/todos', authUser, async function(req, res, next) {
  try {
    const result = await sql.getTodoList(
      req.query.apikey,
      req.query.limit,
      req.query.skip,
    )
    if (isEmpty(result[0])){
      return res.json({
        'status': 404,
        'error': '해당 게시글을 찾지 못했습니다.'
      })
    }
    return res.send(result)
  } catch (err) {
    console.log(err)
    res.json({
      'status': 400,
      'error': err,
    })
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
      if (!result[0].affectedRows){
        return res.json({
          'status': 304,
          'error': 'not modified',
        });
      };
      // 업데이트 내용 반환
      return res.send(result)
  } catch (err) {
    console.log(err)
    res.json({
      'status': 400,
      'error': err,
    })
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
    if (!result[0].affectedRows){
      return res.json({
        'status': 304,
        'error': 'not modified',
      });
    };
    // 삭제 성공
    return res.sendStatus(204);

  } catch(err) {
    console.log(err);
  }
});


module.exports = router;