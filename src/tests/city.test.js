const request = require('supertest');
const app = require('../app');


let token;

beforeAll(async ()  => {
    const credentials = {
        email:"oskareilys@gmail.com",
        password: "123456",
    } 
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
} )

test('GET /cities debe mostrar todas la ciudades', async () => {
    const res = await request(app).get('/cities');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /cities debe crear una ciudad', async() => {
    
    const city = {
        name:"Caracas",
        country: "Venezuela",
        countryId:"VE",
        
    } 
    const res = await request(app).post('/cities').send(city)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(city.name);
} );

test('PUT /cities/:id debe actualizar una ciudad', async() => {

    const city = {
        name:"CARACAS"
    } 
    const res = await request(app).put('/cities/'+id).send(city)
        .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(city.name);

} );

test('DELETE /cities/:id debe eliminar una ciudad', async() => {
    const res = await request(app).delete('/cities/'+id)
        .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(204);
} );
