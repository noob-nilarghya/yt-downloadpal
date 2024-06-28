
const express = require('express');
const app = express();
const path = require('path');
const http= require('http');
const cookieParser= require('cookie-parser'); // to parse cookie
const bodyParser= require('body-parser');

const dotenv= require('dotenv');
dotenv.config({ path: './config.env'});

const cors= require('cors');

const PORT = process.env.PORT || 5000;


const corsOptions = {
    origin: process.env.CLIENT_URL, // Specify the exact origin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    credentials: true,
    allowedHeaders: ['X-Requested-With', 'Content-Type', 'Accept', 'Origin', 'Cache-Control' ]
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, Cache-Control, X-Requested-With');
    next();
});

app.use(cookieParser());


app.use(express.json()); // required (called middleware). // response data more than 10kb is not allowed
app.use(express.urlencoded( { extended: true} ));
app.use(bodyParser.json());

app.use(express.static(path.join(process.cwd(), "Client", "dist")));
app.use(express.static(path.join(process.cwd())));

// ROUTES HANDLING
const webRouter= require('./routes/webRouter');

app.use('/api', webRouter); // route mounting
app.get('/sitemap.xml', (req, res) => {
    res.sendFile(path.join(process.cwd(), "sitemap.xml"));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), "Client", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
