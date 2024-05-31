const request = require('supertest');
const app = require('../app');


let token;
let id;

beforeAll(async ()  => {
    const credentials = {
        email:"oskareilys@gmail.com",
        password: "123456",
    } 
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
} )

test('GET /reviews debe mostrar todas las reviews', async () => {
    const res = await request(app).get('/reviews')
        .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /reviews debe crear una review', async() => {
    
    const review = {
        rating:"5",
        comment: "Excelente servicio",
    } 
    const res = await request(app).post('/reviews').send(review)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.rating).toBe(review.rating);
    expect(res.body.comment).toBe(review.comment);
} );

test('PUT /reviews/:id debe actualizar una review', async() => {

    const review = {
        rating:"4.5",
        comment: "Excelente servicio",
    } 
    const res = await request(app).put('/reviews/'+id).send(review)
        .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(200);
    expect(res.body.rating).toBe(review.rating);
    expect(res.body.comment).toBe(review.comment);

} );

test('DELETE /reviews/:id debe eliminar una review', async() => {
    const res = await request(app).delete('/reviews/'+id)
        .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(204);
} );