const express = require('express');
const http = require('http');

var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const axios = require('axios');
const Settings = require('./app/common/Settings');

app.set('socketio', io);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());

const PORT = 5000;

mongoose.connect(`mongodb+srv://${Settings.database.username}:${Settings.database.password}@cluster0.mrjwz.gcp.mongodb.net/${Settings.database.databaseName}?retryWrites=true&w=majority`,);

// check connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db connected');
});

app.use('/', require('./routes/navigation'));

server.listen(PORT, () => {
    console.log(`Server listen to port: ${PORT}`);
});

io.on('connection', (socket) => {
    console.log(`socket id: ${socket.id}`);
})

// make alive
setInterval(() => {
    axios.get('https://fire-alarm-api.glitch.me/')
        .then(res => {
            console.log('MAKE APP ALIVE;');
        })
}, 3 * 60 * 1000);