const _ = require("lodash");
var sql = require('../database/sql')

const Unauthorized = 401;

async function authUser(req, res, next) {
    try {
        const apikey = req.query.apikey;
        console.log('apikey', apikey);
        if (_.isEmpty(apikey)) {
            return res.sendStatus(Unauthorized);
        }
        const findUser = await sql.findUser(apikey)
        if (_.isNil(findUser[0])) {
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
