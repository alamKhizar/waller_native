const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { connectDB } = require('./Config/db');
// const { connectDB } = require('./Config/db');
// const CreateConnection = require('./Config/db');



// //1
dotenv.config();

// //1.1
connectDB();

// //2
const app = express();


// //3 middle ware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// //cors is used to allow the request from the different domain 


// //4 route
// app.get('/', (req, res) => {
//     res.send('Hello World!');
//     }
// );
app.use('/waller/auth',require('./Routes/userRoute'))


// //5 call port
const PORT = process.env.PORT || 8084;

// //6 listen port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgYellow.black);
    })