// const _ = require("lodash");
const isEmpty = require('./isEmpty');
var sql = require('../database/sql');

const Unauthorized = 401;

async function authUser(req, res, next) {
    try {
        const apikey = req.query.apikey;
        console.log('apikey', apikey);
        console.log(isEmpty(apikey))
        if (isEmpty(apikey)) {
            return res.sendStatus(Unauthorized);
        }
        const findUser = await sql.findUser(apikey)
        if (isEmpty(findUser[0])) {
            return res.sendStatus(Unauthorized);
        }
        console.log(findUser)
        req.user = findUser;
        return next();
    } catch (err) {
        console.log(err)
        return res.sendStatus(Unauthorized);
    }
}

module.exports = authUser;
