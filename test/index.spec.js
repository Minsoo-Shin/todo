const request = require('supertest');
const should = require('should');
const app = require('../app');

describe('GET /todos는', () => {
    describe('성공시', () => {
        it('최대 limit 갯수 만큼 가져온다.', (done)=> {
            request(app)
                .get('/todos?apikey=123&limit=2&skip=1')
                .end((req,res)=> {
                    console.log(res.body)
                    res.body.should.be.lengthOf(2);
                    done();
                })
        })
    })
    describe('실패시', () => {
        it('limit가 숫자형이 아니라면', (done)=> {
            request(app)
                .get('/todos?apikey=123&limit="notint"&skip=1')
                .expect(400)
                .end(done)
        }),
        it('limit가 null값 이라면', (done)=> {
            request(app)
                .get('/todos?apikey=123&limit=null&skip=1')
                .expect(400)
                .end(done)
        }),
        it('skip가 숫자형이 아니라면', (done)=> {
            request(app)
                .get('/todos?apikey=123&limit="12"&skip="notint"')
                .expect(400)
                .end(done)
        }),
        it('skip가 null값 이라면', (done)=> {
            request(app)
                .get('/todos?apikey=123&limit="12"&skip=null')
                .expect(400)
                .end(done)
        }),
        it('limit값이 100 초과하면', (done)=> {
            request(app)
                .get('/todos?apikey=123&limit=1000&skip=1')
                .expect(400)
                .end(done)
        })
    });
})

describe('GET /todos/:id는', () => {
    describe('성공시', () => {
        it('id에 해당하는 게시글 내용을 가져온다.', (done)=> {
            request(app)
                .get('todos/20?apikey=123')
                .expect(200)
                .end(done)
        })
    })
    describe('실패시', () => {
        // it('limit가 숫자형이 아니라면', (done)=> {
        //     request(app)
        //         .get('/todos?apikey=123&limit="notint"&skip=1')
        //         .expect(400)
        //         .end(done)
        // }),
        // it('limit가 null값 이라면', (done)=> {
        //     request(app)
        //         .get('/todos?apikey=123&limit=null&skip=1')
        //         .expect(400)
        //         .end(done)
        // }),
        // it('skip가 숫자형이 아니라면', (done)=> {
        //     request(app)
        //         .get('/todos?apikey=123&limit="12"&skip="notint"')
        //         .expect(400)
        //         .end(done)
        // }),
        // it('skip가 null값 이라면', (done)=> {
        //     request(app)
        //         .get('/todos?apikey=123&limit="12"&skip=null')
        //         .expect(400)
        //         .end(done)
        // }),
        // it('limit값이 100 초과하면', (done)=> {
        //     request(app)
        //         .get('/todos?apikey=123&limit=1000&skip=1')
        //         .expect(400)
        //         .end(done)
        // })
    });
})