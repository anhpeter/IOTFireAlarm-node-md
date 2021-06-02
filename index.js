const express = require('express');

var bodyParser = require('body-parser')

const Response = require('./app/common/response');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const mongoose = require('mongoose');

const PORT = 3000;
const roomModel = require('./app/models/rooms');

// mongoose
mongoose.connect('mongodb+srv://webfullstack99:LoveGuitar99@cluster0.mrjwz.gcp.mongodb.net/FireAlarm?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

// check connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db connected');
});

app.get('/', (req, res) => {
    res.json({ message: 'fire alarm api' });
})

app.get('/get-last', (req, res) => {
    res.json({ message: 'fire alarm api' });
})

app.use('/room', require('./routes/room'));

app.use('/room-status', require('./routes/room_status'));

app.listen(PORT, () => {
    console.log(`Server listen to port: ${PORT}`);
})