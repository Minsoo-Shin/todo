const isEmpty = require('./isEmpty');
var sql = require('../database/sql');

async function authUser(req, res, next) {
    try {
        // apikey가 비어있다면
        const apikey = req.query.apikey;
        if (isEmpty(apikey)) next(Error("Bad_Request"));

        // apikey와 일치하는 회원이 없다면
        const findUser = await sql.findUser(apikey)
        if (isEmpty(findUser)) next(Error("Not_Authorized"))

        return next();

    } catch (err) {
        console.log(err)
        next(Error("Server_Error"))
    }
}

module.exports = authUser;
