const express = require('express');
const http = require('http');

var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const Settings = require('./app/common/Settings');
const roomStatusModel = require('./app/models/room_status');

app.set('socketio', io);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

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
    });

    // CLEAR USES STATUS DATA 
    roomStatusModel.clearUselessData();
});