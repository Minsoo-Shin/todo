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
    return await promisePool.query(`
      INSERT INTO todos
      (name, completed, fk_user_id)
      VALUES
      (${content}, ${completed}, ${user_id})
      `)
  },
}

module.exports = sql