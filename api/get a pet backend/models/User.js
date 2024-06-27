const mongoose = require('../database/connection');
const { Schema } = require('mongoose');

const User = mongoose.model('User',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        phone: {
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        }
    }, { timestamps: true }));
       //cria duas colunas: created_at e updated_at


module.exports = User;