const request = require('supertest');
const app = require('../app');

let id;
let token;


test('POST /users debe crear un user', async() => {
    
    const user = {
        firstName:"Christopher Edward",
        lastName: "Nolan",
        email:"oskareilys12@gmail.com",
        password:"123456",
        gender:"female"
    } 
    const res = await request(app).post('/users').send(user);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
} );

test('POST /users/login debe loguear al user', async () => {
    const credentials = {
        email:"oskareilys12@gmail.com",
        password: "123456",
    } 
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined(credentials.token); 
    expect(res.body.user.email).toBe(credentials.email);   
});

test('GET /users debe mostrar todos los usuarios', async () => {
    const res = await request(app).get('/users')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/:id debe actualizar un user', async() => {

    const user = {
        firstName:"Reina",
        lastName: "Salazar",
    } 
    const res = await request(app).put('/users/'+id).send(user)
        .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);

} );

test('POST /users/login con credenciales incorrectas debe dar error', async () => {
    const credentials = {
        email:"oskareilys123@gmail.com",
        password: "123456",
    } 
    const res = await request(app).post('/users/login').send(credentials);
    expect(res.status).toBe(401);  
});

test('DELETE /users/:id debe eliminar un user', async() => {
    const res = await request(app).delete('/users/'+id)
        .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(204);
} );