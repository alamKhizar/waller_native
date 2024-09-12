const mongoose = require('mongoose');
const express = require('express');

const connectDB = async () => 
{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL);
        
        console.log(`MongoDB connected: ${connection.connection.host}`.bgGreen.underline);
    }catch(error)
    {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = {connectDB};