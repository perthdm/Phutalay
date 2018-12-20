const express = require('express');
const session = require('express-session');
const middleAuth = require('./middleware/auth');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 8080;
require('./helpers/mongoHelper')(mongoose);
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false
}));
mongoose.set('useCreateIndex', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes/users.js'));
app.use('/reservation', middleAuth.checkLogin, require('./routes/reservation'));
app.use('/booking', middleAuth.checkLogin, require('./routes/booking'));
app.use( middleAuth.checkLogin, require('./routes/checkin'));
app.use( middleAuth.checkLogin, require('./routes/checkout'));
app.use( middleAuth.checkLogin, require('./routes/bill'));

var server = app.listen(port, function () {
    console.log('Phutalay Server is running on port ' + port);
});

