var express = require('express'),
  exphbs = require('express-handlebars'),
  routes = require('./routes/default/index'),
  users = require('./routes/default/users')

// init express
var app = express();

app.set('Storyblok', 'views')
app.use(express.static(__dirname + '/public'));

// setup routes
app.use('/', routes);
app.use('/users', users);

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: 'views/components/'
}))

app.set('view engine', '.hbs')
app.set('views', 'views')

// set the port
app.set('port', (process.env.PORT || 41015));

// start the server
app.listen(app.get('port'), function () {
  console.log('Server running on port ' + app.get('port'));
});
