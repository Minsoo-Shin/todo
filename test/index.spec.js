const request = require('supertest');
const should = require('should');
const app = require('../app');
const sql = require('../database/sql')

describe('POST /todos는', ()=> {
    describe('성공시', ()=> {
        let id = 0
        afterEach('clear', ()=> {
            sql.deleteTodo(999, id)
        });

        it('todo를 만들면 json 형식으로 응답을 받는다. ', (done)=> {
            request(app)
                .post('/todos?apikey=999')
                .send({'name':'lose weight', 'completed':false})
                .expect(200)
                .end((req,res)=> {
                    id = res.body.id;
                    done()
                })
            
            //삭제 로직 필요
        }),
        it('completed에 null값이라도 응답을 받는다. ', (done)=> {
            request(app)
                .post(`/todos/?apikey=999`)
                .send({'name':'lose weight', 'completed':null})
                .expect(200)
                .end((req, res)=> {
                    id = res.body.id;
                    done()
                })
            //삭제 로직 필요
        })
    })
    describe('실패시', ()=> {
        it('name에 null값이라면', (done)=> {
            request(app)
                .post('/todos?apikey=999')
                .send({'name': null, 'completed':false})
                .expect(400)
                .end(done)
        }),
        it('completed에 not boolean값이라면', (done)=> {
            request(app)
                .post('/todos?apikey=999')
                .send({'name': 'something', 'completed': 'fal'})
                .expect(400)
                .end(done)
        })
    })
})

describe('GET /todos는', () => {
    describe('성공시', () => {
        it('최대 limit 갯수 만큼 가져온다.', (done)=> {
            request(app)
                .get('/todos?apikey=123&limit=2&skip=1')
                .end((req,res)=> {
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