const request = require('supertest');
const app = require('../app');

let id;
let token;

beforeAll(async ()  => {
    const credentials = {
        email:"oskareilys@gmail.com",
        password: "123456",
    } 
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
} )

test('GET /hotels debe mostrar todos los hoteles', async () => {
    const res = await request(app).get('/hotels');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /hotels debe crear un hotel', async() => {
    
    const hotel = {
        name: "Sheraton",
        description:"Somos un hotel de calidad, prestigio y nos reservamos el derecho de admisión",
        price:102.30 ,
        address:"Calle 3, con avenida 5",
        lat: 1245615625568586.22,
        lon: -124554322.52
        
    } 
    const res = await request(app).post('/hotels').send(hotel)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(hotel.name);
} );

test('PUT /hotels/:id debe actualizar un Hotel', async() => {

    const hotel = {
        name: "Sheraton H&R"
    } 
    const res = await request(app).put('/hotels/'+id).send(hotel)
        .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(hotel.name);

} );

test('DELETE /hotels/:id debe eliminar un hotel', async() => {
    const res = await request(app).delete('/hotels/'+id)
        .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(204);
} );
