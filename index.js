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
const Helper = require('./app/common/Helper');

process.on('unhandledRejection', error => {
  // handle error ... or don't
});

// parse application/x-www-form-urlencoded
app.set('socketio', io);
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

// ROUTES
app.use('/', require('./routes/navigation'));
server.listen(PORT, () => {
    console.log(`Server listen to port: ${PORT}`);
});

// IO
io.on('connection', (socket) => {
})

setInterval(() => {
    const data = dummyData();
    io.emit(`SERVER_EMIT_ROOM_WITH_STATUS_${data.room._id}`, data)
}, 2000);

const dummyData = () => {
    const data = {
        "_id": "6163a2d6443a0500b4fe82b1",
        "gas": Helper.genRandNumber(1) % 2 == 0 ? 0 : 1,
        "flame": Helper.genRandNumber(1) % 2 == 0 ? 0 : 1,
        "room": {
            "_id": "6162ef282821861b2881a580",
            "name": "Room 2",
            "imageUrl": "https://cdn.luxstay.com/rooms/25495/large/room_25495_56_1558713243.jpg",
            "__v": 0
        },
        "date": "2021-10-11T02:35:02.810Z",
        "__v": 0
    };
    return data;
}


//make alive
setInterval(() => {
    axios.get('https://fire-alarm-api.glitch.me/')
        .then(res => {
            console.log('MAKE APP ALIVE;');
        }).catch((e) => e)
}, 3 * 60 * 1000);