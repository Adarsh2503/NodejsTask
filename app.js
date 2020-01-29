const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
const cors = require('cors')

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

mongoose.connect(
    'mongodb+srv://usertable:adi2503@cluster0-9ozhz.mongodb.net/test?retryWrites=true&w=majority'
    , { useNewUrlParser: true }, (err) => {
    console.log('you',err);
});

const userModel = require('./models/user');
const userRoleModel = require('./models/userRole');

const subscription = require('./router/subscription')(userModel, userRoleModel);

const port = process.env.port || 3000;




app.use('', subscription);
app.get('/', (req, res) => {
    res.send('Welcome to My subscription portal');
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});