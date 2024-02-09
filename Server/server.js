
const express = require('express');
const app = express();
const path = require('path');
const http= require('http');
const cookieParser= require('cookie-parser'); // to parse cookie

const dotenv= require('dotenv');
dotenv.config({ path: './config.env'});

const cors= require('cors');

const PORT = process.env.PORT || 5000;


const corsOptions= {
    // origin: "http://127.0.0.1:5173",
    origin: process.env.CLIENT_URL,
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true
}

app.use(cors(corsOptions));

app.use(cookieParser());


app.use(express.json( { limit: '1024kb' } )); // required (called middleware). // response data more than 10kb is not allowed
app.use(express.urlencoded( { extended: true, limit: '1024kb'} ));


// ROUTES HANDLING
const webRouter= require('./routes/webRouter');

app.use('/api', webRouter); // route mounting

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
