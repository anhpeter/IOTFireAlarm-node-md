const express = require('express');
const http = require('http');

var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const axios = require('axios');

app.set('socketio', io);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());


const PORT = 3000;

// mongoose
mongoose.connect('mongodb+srv://admin:Admin123@cluster0.mrjwz.gcp.mongodb.net/FireAlarm?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

// check connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db connected');
});

app.get('/', (req, res) => {
    res.json({ message: 'This is Fire Alarm Api' });
})

app.get('/get-last', (req, res) => {
    res.json({ message: 'fire alarm api' });
})

app.use('/room', require('./routes/room'));
app.use('/room-status', require('./routes/room_status'));


server.listen(PORT, () => {
    console.log(`Server listen to port: ${PORT}`);
});

io.on('connection', (socket) => {
    console.log(`socket id: ${socket.id}`);
})


setInterval(() => {
    axios.get('https://alert-deserted-prose.glitch.me/').then(res => {
        console.log(res.data);
    })
}, 3*60*1000);