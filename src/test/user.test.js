const supertest = require('supertest')
const app = require ('../app')
const request = require ('supertest')

let token
let userId

const BASE_URL = '/api/v1/users'

const user = {
    firstName: "Alejandra",
    lastName: "Acuña",
    email: "ale@gmail.com",
    password: "12345",
    gender: "female",
}

test("POST -> 'BASE_URL', should responde status code 201 and res.body.email == user.email", async() =>{

    const res = await request(app)
        .post(BASE_URL)
        .send(user)

        userId = res.body.id

    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.id).toBeDefined();
    expect(res.body.email).toBe(user.email);
})

test("POST -> 'BASE_URL/login', should responde status code 200 and res.body.user and ures.body.token", async() =>{

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send({
            email: "ale@gmail.com",
            password: "12345"
        })

    token = res.body.token;

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.user).toBeDefined();
    expect(res.body.token).toBeDefined();
  
    expect(res.body.user.email).toBe(user.email);
})

test("POST -> 'BASE_URL/login', should return statusCode 401", async () => {

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send({
            email: "day@gmail.com",
            password: "12345"
        })
  
    expect(res.status).toBe(401);
    expect(res.body).toBeDefined();
    expect(res.body.message).toBe('Credentials invalid');
  })

test("Get -> 'BASE_URL', should retunr statusCode 200, and res.body. lentgth == 1", async() => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${token}`)
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
})

test("Get -> 'BASE_URL/:id', should retunr statusCode 200, and res.body.email == user.email", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${userId}`)
        .set('Authorization', `Bearer ${token}`)
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.email).toBe(user.email);
})

test("PUT -> 'BASE_URL/:id', should return statusCode 200, and res.body.firstName === user.firstName", async () => {
    const res = await request(app)
        .put(`${BASE_URL}/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ firstName: "Dayana" })
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe('Dayana');
})
  
  test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${userId}`)
        .set('Authorization', `Bearer ${token}`)
  
    expect(res.statusCode).toBe(204);
})
  
  

