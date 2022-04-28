const _ = require('lodash'); 
const MAX_LIMIT = 100;

async function validate(object) {
    const {req, name, completed, limit, skip} = object;
    if (name){
        console.log('checkName')
        const bodyName = req.name
        if (!checkName(bodyName)) return false
    }
    if (completed) {
        console.log('checkCompleted')
        const bodyCompleted = req.completed;
        if (!checkCompleted(bodyCompleted)) return false;
    }
    if (limit) {
        console.log('checkLimit');
        const bodyLimit = req.limit;
        if (!checkLimit(bodyLimit)) return false;
    }
    if (skip) {
        console.log('checkSkip');
        const bodySkip = req.skip;
        if (!checkSkip(bodySkip)) return false;
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
    if (!_.isInteger(limit) || _.toLength(limit) <= MAX_LIMIT)
        return false;
    return true;
}
function checkSkip(skip) { // 왜 schemas에 skip타입이 string이지?  
    if (!_.isInteger(skip)) return false;
}


module.exports = validate;