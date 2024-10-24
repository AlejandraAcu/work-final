const request = require('supertest')
const app = require('../app')

let user
let TOKEN
let hotelId

const BASE_URL = '/api/v1/hotels'

const hotel = {
  name: "dddhdh",
  description: "hhdhd",
  price: "2324",
  address:"dsdad",
  lat:"323",
  lon:"3232",
  rating:"3242",
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


test("POST -> 'BASE_URL', should return status code 201, and res.body.name === hotel.name", async () => {

    const res = await request(app)
        .post(BASE_URL)
        .send(hotel)
        .set('Authorization', `Bearer ${TOKEN}`)

    hotelId = res.body.id

    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(hotel.name);
})


test("GET -> 'BASE_URL', should return status code 200, and res.body.length === 1", async () => {

    const res = await request(app)
        .get(BASE_URL)

        console.log(res.body)

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);

    expect(res.body[0].name).toBe(hotel.name);
    expect(res.body[0].city).toBeDefined()
    expect(res.body[0].images).toBeDefined()
    expect(res.body[0].images).toHaveLength(0)
})


test("GET -> 'BASE_URL/:id', should return status code 200, and res.body.name === hotel.name", async () => {

    const res = await request(app)
        .get(`${BASE_URL}/${hotelId}`)
        
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(hotel.name)

    expect(res.body.city).toBeDefined()
    expect(res.body.images).toBeDefined()
    expect(res.body.images).toHaveLength(0)
    

})

test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.name === hotelUpdate.name", async () => {

    const hotelUpdate = {
        name: 'sss'
    }

    const res = await request(app)
        .put(`${BASE_URL}/${hotelId}`)
        .send(hotelUpdate)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(hotelUpdate.name);
})

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${hotelId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204);
})

