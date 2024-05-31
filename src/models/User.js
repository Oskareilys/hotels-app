const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique:true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM(['male','female','other']),
        allowNull: false
    },
});

User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
};

module.exports = User;