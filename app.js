var express = require('express');
var http = require('http');
﻿var createError = require('http-errors');
var path = require('path')
var app = express()
var cors = require('cors')
var compression = require('compression')
var helmet = require('helmet')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var methodOverride = require('method-override')
var routers = require('./routes')
var port = process.env.PORT || 3600;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors())
app.use(express.static('public'));
app.use(methodOverride());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet())
app.use(compression())
app.use(express.json({limit: '1mb'}));
app.use('/public', express.static('public'));
app.use('/' , routers)



app.use(function (req, res, next) {
    req.io = io
    next()
});

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.listen(port, () =>
    console.log(`Server running on port ${port}`)
);
