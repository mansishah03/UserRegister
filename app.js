var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');



var port = 3000;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



const mongoose = require('mongoose');
const UserModel = require('./Models/Users');
const app = express();
app.use(cors());
//DB Connection 
mongoose.connect('mongodb+srv://mansipshah03_db_user:j3iC16ntTeKwlrJo@userdata.sjrbyvp.mongodb.net/userData')
  .then(() => console.log('Connection established'))
  .catch(err => console.error(err));


// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.post('/register', (req, res) => {
  UserModel.create(req.body)
    .then(data => res.json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get('/display', (req, res) => {
  UserModel.find()
    .then(data => res.json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
