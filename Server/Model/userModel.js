const mongoose = require('mongoose');
const express = require('express');
const colors = require('colors');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
},{timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;