const mysql = require('mysql2');

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
    console.log("findUser힘수")
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
    return result[0]
  },

  getTodoList : async (apikey) => {
    console.log(apikey)
    const result = await promisePool.query(`
      SELECT id, name, completed, completed_at, created_at, updated_at
      FROM todos
      WHERE fk_user_id = ${apikey}
      ORDER BY id
    `)
    return result[0]
  }
}

module.exports = sql