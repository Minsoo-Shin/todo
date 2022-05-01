# todo
> 다음은 todo list api입니다. 

## 활용스택
node js, express js, mysql입니다. 

## 진행현황
#### REST ful API
> ```GET Todos``` : 완료 <br>
> ```UPATE Todos``` : 완료  <br>
> ```DELETE Todos``` : 완료  <br>
> ```CREATE Todos``` : 완료  <br>
> ```List Todos``` : 완료  <br>

#### Authorization
> api_key 기준으로 인증받고 서비스 실행

#### Unit Test, Integration Test (mocha)
> ```GET Todos``` : 테스트 코드 작성 완료  <br>
> ```UPATE Todos``` : 테스트 코드 작성 완료  <br>
> ```DELETE Todos``` : 테스트 코드 작성 완료  <br>
> ```CREATE Todos``` : 테스트 코드 작성 완료  <br>
> ```List Todos``` : 테스트 코드 작성 완료  <br>

#### Image Upload (차후 진행)
#### Dev/Prod Enviroment (차후 진행)
#### CI/CD (치후 진행)

## 실행
1. 데이터베이스 스키마는 database/schema.sql 스크립트로 구성  <br>
    1-1. database/sql.js db 주소 확인 <br>
    ```js
    const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
        host: 'localhost',
        user: 'root',
        database: 'todo',
        password: '****',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
    );
    ```
2. npm start : 서버 실행  <br>
3. npm test : 테스트 실행  <br>
