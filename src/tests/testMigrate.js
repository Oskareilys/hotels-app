const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app');


const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();

        const user = {
            firstName:"Reina O",
            lastName: "Salazar",
            email:"oskareilys@gmail.com",
            password:"123456",
            gender:"female"
        } 
        await request(app).post('/users').send(user);
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();