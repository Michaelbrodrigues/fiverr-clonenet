require('dotenv').config();
const express = require('express');
const { MongoClient } = require("mongodb");
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connect = require('./configs/db');
const PORT = 8080;

//conecction to mongodb                                                                                                                                        
const url = "mongodb+srv://michaelbrunorodrigues:b2uSExcG@cluster0.kabxwa5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
            alert("You are connected!");
                app.get('/', (request, response) => {
                    response.send('you are connected!');
                });

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);

// Other Route files
const { userRoute, conversationRoute, gigRoute, messageRoute, orderRoute, reviewRoute, authRoute } = require('./routes');

// App
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:4173', 'https://fazumbicobom.netlify.app/'],
    credentials: true
}));

// Other Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/gigs', gigRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/orders', orderRoute);
app.use('/api/messages', messageRoute);
app.use('/api/reviews', reviewRoute);

// Routes
app.get('/', (request, response) => {
    response.send('Hello, Topper!');
});

app.get('/ip', (request, response) => {
    const list = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    const ips = list.split(',');

    return response.send({ ip: ips[0] });
})

app.listen(PORT, async () => {
    try {
        connect();
        console.log(`Listening at http://localhost:${PORT}`);
    }
    catch ({ message }) {
        console.log(message);
    }
})
