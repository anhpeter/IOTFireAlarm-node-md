const express = require('express');

var bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const PORT = 3000;

// mongoose
mongoose.connect('mongodb+srv://admin:Admin123@cluster0.mrjwz.gcp.mongodb.net/FireAlarm?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

// check connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
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

app.listen(PORT, () => {
    console.log(`Server listen to port: ${PORT}`);
});