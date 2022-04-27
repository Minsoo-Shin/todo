const request = require('supertest');
const should = require('should');
const app = require('../app');

describe('GET /todos는', () => {
    describe('성공시', () => {
        it('객체로 받은 ', (done)=> {
            request(app)
                .get('/?apikey=123')
                .end((req,res)=> {
                    console.log(res.body)
                    res.body.should.be.instanceOf(Array);
                    done();
                })
        })
    })
})