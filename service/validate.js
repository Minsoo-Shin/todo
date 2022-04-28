const _ = require('lodash'); 
const MAX_LIMIT = 100;
const MIN_LIMIT = 1
const DEFAULT_LIMIT = 10;
const DEFAULT_SKIP = 0;
const MAX_ID = 1000000
const MIN_ID = 0

async function validate(object) {
    const {req, name, completed, limit, skip, id} = object;
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
    if (id) {
        console.log('checkId');
        const queryId = req.params.id;
        if (!checkId(queryId)) return false;
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
    if (limit > MAX_LIMIT || limit < MIN_LIMIT) return false;
    return true;
}
function checkSkip(skip) { // 왜 schemas에 skip타입이 string이지?  
    const intskip = parseInt(skip, DEFAULT_SKIP);
    if (Number.isNaN(intskip)) return false;
    return true
}
function checkId(id) { // 왜 schemas에 skip타입이 string이지?  
    const intid = parseInt(id, DEFAULT_SKIP);
    if (Number.isNaN(intid)) return false;
    if (intid > MAX_ID || intid < MIN_ID) return false;
    return true
}
 

module.exports = validate;