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

test('GET /bookings debe mostrar todas las reservas del usuario logueado', async () => {
    const res = await request(app).get('/bookings')
        .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /bookings debe crear una reserva', async() => {
    
    const booking = {
        checkIn:"2024-06-01",
        checkOut: "2024-06-15",
    } 
    const res = await request(app).post('/bookings').send(booking)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.checkIn).toBe(booking.checkIn);
    expect(res.body.checkOut).toBe(booking.checkOut);
} );

test('PUT /bookings/:id debe actualizar una reserva', async() => {

    const booking = {
        checkIn:"2024-06-01",
        checkOut: "2024-06-15",
    } 
    const res = await request(app).put('/bookings/'+id).send(booking)
        .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(200);
    expect(res.body.checkIn).toBe(booking.checkIn);
    expect(res.body.checkOut).toBe(booking.checkOut);

} );

test('DELETE /bookings/:id debe eliminar una reserva', async() => {
    const res = await request(app).delete('/bookings/'+id)
        .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(204);
} );