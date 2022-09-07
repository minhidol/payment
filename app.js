var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jsonLog = require("morgan-json");
var requestIp = require("request-ip");
const hbs = require('express-handlebars');
const handlebars = require('handlebars');
handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));
handlebars.registerHelper('for', function(from, to, incr, block) {
  var accum = '';
  for(var i = from; i <= to; i += incr)
      accum += block.fn(i);
  return accum;
});
handlebars.registerHelper('compare', function(variable, value) {
  return variable == value;
});
var indexRouter = require('./src/frontend/routes/index');
const indexApiRouter = require('./src/api/routes/index.route');
const bearerToken = require('express-bearer-token');


var app = express();
const port = process.env.PORT || 8003;

// view engine setup
app.use(bearerToken());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  //defaultLayout: 'index',
  partialsDir: __dirname + '/views/partials/'
}));
logger.token("clientRealIp", function (req, res) {
  var ip = requestIp.getClientIp(req);
  return ip || undefined;
});

const loggerFormat = jsonLog({
  "@timestamp": ":date[iso]",
  method: ":method",
  path: ":url",
  http: " HTTP/:http-version",
  status: ":status",
  remote_addr: ":clientRealIp",
  length: ":res[content-length]",
  "response-time": ":response-time ms",
  referrer: ":referrer",
  "user-agent": ":user-agent",
});


app.use(logger(loggerFormat));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexApiRouter);
app.use('/', indexRouter);

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
  console.log(`Server listening is running on ${port}`);
});

module.exports = app;
