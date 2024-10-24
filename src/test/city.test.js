const request = require('supertest')
const app = require('../app')

let user
let TOKEN
let cityId

const BASE_URL = '/api/v1/cities'

const city = {
  name: "Colombia",
  country: "Bogota",
  countryId: "BGT"
}

beforeAll(async () => {
    user = await request(app)
        .post('/api/v1/users')
        .send({
            firstName: "Alejandra",
            lastName: "Acuña",
            email: "ale@gmail.com",
            password: "12345",
            gender: "female",
    })

    const credentials = {
        email: "ale@gmail.com",
        password: "12345"
    }

    const resToken = await request(app)
        .post('/api/v1/users/login')
        .send(credentials)

    TOKEN = resToken.body.token

})

afterAll(async () => {
    await request(app)
        .delete(`/api/v1/users/${user.body.id}`)
        .set('Authorization', `Bearer ${TOKEN}`)
})


test("POST -> 'BASE_URL', should return status code 201, and res.body.name === city.name", async () => {

    const res = await request(app)
        .post(BASE_URL)
        .send(city)
        .set('Authorization', `Bearer ${TOKEN}`)

    cityId = res.body.id

    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(city.name);
})


test("GET -> 'BASE_URL', should return status code 200, and res.body.length === 1", async () => {

    const res = await request(app)
        .get(BASE_URL)


    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe(city.name);
})


test("GET -> 'BASE_URL/:id', should return status code 200, and res.body.name === city.name", async () => {

    const res = await request(app)
        .get(`${BASE_URL}/${cityId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(city.name)
})

test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.name === cityUpdate.name", async () => {

    const cityUpdate = {
        name: 'Neiva'
    }

    const res = await request(app)
        .put(`${BASE_URL}/${cityId}`)
        .send(cityUpdate)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(cityUpdate.name)
})

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${cityId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
})

