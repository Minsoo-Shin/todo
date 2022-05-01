const request = require('supertest');
const should = require('should');
const app = require('../app');
const sql = require('../database/sql')

describe('POST /todos는', ()=> {
    describe('성공시', ()=> {
        let id = 0
        afterEach('clear', (done)=> {
            sql.deleteTodo(999, id)
            done();
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
    let testkey = 999
    let id = 0
    let idList = []
    beforeEach('make', async ()=> {
        for (let i = 0; i < 5; i++){
            const result = await sql.createTodo(testkey, 'test', false)
            idList.push(result[0].id)
        }
        console.log('idlist', idList);

    })
    afterEach('clear', (done)=> {
        for (let i = 0; i < idList.length; i++){
            sql.deleteTodo(testkey, idList[i])
        }
        idList = []
        done();
    });
    describe('성공시', () => {
        it('최대 limit 갯수 만큼 가져온다.', (done)=> {
            request(app)
                .get(`/todos?apikey=${testkey}&limit=2&skip=0`)
                .expect(200)
                .end((req,res)=> {
                    res.body.should.be.lengthOf(2);
                    done();
                })
        })
        it('skip수 만큼 제외하고 limit만큼 가져온다.', (done)=> {
            request(app)
                .get(`/todos?apikey=${testkey}&limit=1&skip=1`)
                .expect(200)
                .end((req,res)=> {
                    should(res.body[0].id).equal(idList[1])
                    done()
                })
        })
    })
    describe('실패시', () => {
        it('limit가 숫자형이 아니라면', (done)=> {
            request(app)
                .get(`/todos?apikey=${testkey}&limit="notint"&skip=1`)
                .expect(400)
                .end(done)
        }),
        it('limit가 null값 이라면', (done)=> {
            request(app)
                .get(`/todos?apikey=${testkey}&limit=null&skip=1`)
                .expect(400)
                .end(done)
        }),
        it('skip가 숫자형이 아니라면', (done)=> {
            request(app)
                .get(`/todos?apikey=${testkey}&limit="12"&skip="notint"`)
                .expect(400)
                .end(done)
        }),
        it('skip가 null값 이라면', (done)=> {
            request(app)
                .get(`/todos?apikey=${testkey}&limit="12"&skip=null`)
                .expect(400)
                .end(done)
        }),
        it('limit값이 100 초과하면', (done)=> {
            request(app)
                .get(`/todos?apikey=${testkey}&limit=1000&skip=1`)
                .expect(400)
                .end(done)
        })
    });
})

describe('GET /todos/:id는', () => {
    let testkey = 999
    let id = 0
    before('make', async ()=> {
        const result = await sql.createTodo(testkey, 'test', false)
        id = result[0].id

    })
    after('clear', (done)=> {
        sql.deleteTodo(testkey)
        done();
    });
    describe('성공시', () => {
        it('구체적인 id 게시글을 가져오기', (done)=> {
            request(app)
                .get(`/todos/${id}?apikey=${testkey}`)
                .expect(200)
                .end((req,res)=> {
                    should(res.body.id).equal(id)
                    done();
                })
        })
    })
    describe('실패시', () => {
        let NotGoodId;
        it('id가 범위를 벗어난다면 Bad_request 응답', (done)=> {
            NotGoodId = -1;
            request(app)
                .get(`/todos/:${id}?apikey=${testkey}`)
                .expect(400)
                .end(done)
        }),
        it('id가 숫자가 아니라면 Bad_request 응답', (done)=> {
            NotGoodId = 'id';
            request(app)
                .get(`/todos/:${id}?apikey=${testkey}`)
                .expect(400)
                .end(done)
        }),
        it('id가 null값이라면 Bad_request 응답', (done)=> {
            NotGoodId = null
            request(app)
                .get(`/todos/:${id}?apikey=${testkey}`)
                .expect(400)
                .end(done)
        })
    });
})


