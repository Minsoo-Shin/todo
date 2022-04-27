const mysql = require('mysql2');
const isEmpty = require('../routes/isEmpty');

const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'todo',
    password: 'Qwewe123',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);
const promisePool = pool.promise();

const sql = {

  findUser : async (apikey) => {
    let obj = await promisePool.query(`
      SELECT * FROM user
      WHERE ${apikey} = user.user_id`)
    return obj[0];
  },

  createTodo : async (user_id, content, completed) => {
    console.log(user_id, content, completed)
    // 해당 INSERT가 완료하고 해당값 반환
    const result = await promisePool.query(`
      INSERT INTO todos
      (name, completed, fk_user_id)
      VALUES
      ('${content}', ${completed}, ${user_id})
      `)
    //수정) result[0] 아무것도 인서트가 안됐다면 
    console.log('???', result)
    insertedId = result[0].insertId
    const insertedInfo = await promisePool.query(`
      SELECT id, name, completed, completed_at, created_at, updated_at
      FROM todos
      WHERE id = ${insertedId};
    `)
    return insertedInfo[0]; 
  },

  getTodo : async (apikey, id) => {
    console.log(apikey, id)
    const result = await promisePool.query(`
      SELECT id, name, completed, completed_at, created_at, updated_at
      FROM todos
      WHERE fk_user_id = ${apikey} and id = ${id}
      ORDER BY id
    `)
    return result
  },

  getTodoList : async (apikey, limit, skip) => {
    console.log(apikey)
    return promisePool.query(`
      SELECT id, name, completed, completed_at, created_at, updated_at
      FROM todos
      WHERE fk_user_id = ${apikey}
      ORDER BY id
      LIMIT ${limit} OFFSET ${skip}
    `)
  },

  updateCompleted : async (apikey, id) => {
    console.log(apikey, id)
    try {
      const result = promisePool.query(`
      UPDATE todos SET completed=true
      WHERE fk_user_id = ${apikey} and id = ${id};
      `)
      if (isEmpty(result.affectdRows)) throw new Error('해당 게시글이 존재하지 않습니다.')
    
      const updatedInfo = promisePool.query(`
      SELECT id, name, completed, completed_at, created_at, updated_at
      FROM todos
      WHERE id = ${id};
      `)
      res.json(updatedInfo[0])
    } catch(err) {
      throw err;
    }
  },

  deleteTodo : async (apikey, id) => {
    console.log(apikey, id)
    const result = await promisePool.query(`
    DELETE FROM todos WHERE id = ${id}
    `)
    return result
  }
}

module.exports = sql