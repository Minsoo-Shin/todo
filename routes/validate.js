const _ = require('lodash'); 
const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 10;
const DEFAULT_SKIP = 0;

async function validate(object) {
    const {req, name, completed, limit, skip} = object;
    console.log(req.body)
    if (name){
        console.log('checkName')
        const bodyName = req.body.name
        if (!checkName(bodyName)) return false
    }
    if (completed) {
        console.log('checkCompleted')
        const bodyCompleted = req.body.completed;
        if (!checkCompleted(bodyCompleted)) return false;
    }
    console.log(limit, skip)
    if (limit) {
        console.log('checkLimit');
        const queryLimit = req.query.limit;
        if (!checkLimit(queryLimit)) return false;
    }
    console.log(skip)
    if (skip) {
        console.log('checkSkip');
        const querySkip = req.query.skip;
        if (!checkSkip(querySkip)) return false;
    }
    return true
}


function checkName(name) {
    if (_.isNaN(name) || !_.isString(name)) return false;
    return true;
}
function checkCompleted(completed) {
    if ( completed === null || _.isBoolean(completed) ||
            ['true', 'false', 't', 'f'].includes(completed))
        return true;
    return false;
}
function checkLimit(limit) {
    console.log(limit)
    const intlimit = parseInt(limit, DEFAULT_LIMIT);
    console.log('===',intlimit)
    if (Number.isNaN(intlimit)) return false;
    if (_.toLength(limit) > MAX_LIMIT)
        return false;
    return true;
}
function checkSkip(skip) { // 왜 schemas에 skip타입이 string이지?  
    const intskip = parseInt(skip, DEFAULT_SKIP);
    if (Number.isNaN(intskip)) return false;
    return true
}


module.exports = validate;