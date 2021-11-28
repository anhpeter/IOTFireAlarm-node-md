const express = require('express');
const http = require('http');

var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');

// socket
const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        //origin: "http://localhost:3000",
        origin: "https://anhpeter.github.io",
        methods: ["GET", "POST"]
    }
});
const Settings = require('./app/common/Settings');
const roomStatusModel = require('./app/models/room_status');


app.use(cors());
app.set('io', io);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = 5000;

// CONNECT MONGO DATABASE
mongoose.connect(`mongodb+srv://${Settings.database.username}:${Settings.database.password}@cluster0.mrjwz.gcp.mongodb.net/${Settings.database.databaseName}?retryWrites=true&w=majority`,);

// CHECK CONNECTION
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db connected');

    // ROUTES
    app.use('/', require('./routes/navigation'));
    server.listen(process.env.PORT || PORT, () => {
        console.log(`Server listen to port: ${PORT}`);
    });

    // IO
    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);
        socket.on('disconnect', () => {
            console.log('user disconnected', socket.id);
        });
    });

});