const supertest = require('supertest')
const app = require ('../app')
const request = require ('supertest')

let token
let imageId

const BASE_URL = '/api/v1/images'

const image = {
    url: "Imagen"
}

test("POST -> 'BASE_URL', should responde status code 201 and res.body.image == image.url", async() =>{

    const res = await request(app)
        .post(BASE_URL)
        .send(image)

        imageId = res.body.id

    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.url).toBe(image.url);
})

test("Get -> 'BASE_URL', should retunr statusCode 200, and res.body. lentgth == 1", async() => {
    const res = await request(app)
        .get(BASE_URL)
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);

    expect(res.body[0].hotelId).toBeDefined()
})

test("Get -> 'BASE_URL/:id', should retunr statusCode 200, and res.body.url == image.url", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${imageId}`)
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.url).toBe(image.url);

    expect(res.body.hotelId).toBeDefined()
})

test("PUT -> 'BASE_URL/:id', should return statusCode 200, and res.body.url === image.url", async () => {
    const res = await request(app)
        .put(`${BASE_URL}/${imageId}`)
        .send({ url: "imagen2" })
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.url).toBe('imagen2');
})
  
  test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${imageId}`)
  
    expect(res.statusCode).toBe(204);
})
  
  

