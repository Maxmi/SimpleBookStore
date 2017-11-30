const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./server/routes');
const middlewares = require('./server/middlewares');
const methodOverride = require('method-override');
// const session = require('express-session');
// const pgStore = require('connect-pg-simple')(session);

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(middlewares.setDefaultResponseLocals);

app.use('/', routes);

app.use((req, res) => {
  res.render('books/error');
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
  console.log(`http://localhost:${port}`);
});
