var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Importar cors

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var db = require('./conexions/mongo');
var gastoRoutes = require('./routes/gastoRoutes');
var transaccionRoutes = require('./routes/transaccionRoutes');
var balanceRoutes = require('./routes/balanceRoutes');
var usuarioRoutes = require('./routes/usuarioRoutes');
var grupoRoutes = require('./routes/grupoRoutes');
var autentificacionRoutes = require('./routes/autentificacionRoutes');
var notificacionRoutes = require('./routes/notificacionRoutes');
var invitacionRoutes = require('./routes/invitacionRoutes');

var app = express();

// Configuración del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Habilitar CORS antes de las rutas
app.use(cors());

// Configuración de rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', gastoRoutes);
app.use('/api', transaccionRoutes);
app.use('/api', balanceRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', grupoRoutes);
app.use('/api', autentificacionRoutes);
app.use('/api', invitacionRoutes);
app.use('/api', notificacionRoutes);

// Catch 404 y redirigir al manejador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  // Configurar locales, solo proporcionar error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar la página de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
