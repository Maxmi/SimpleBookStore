require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const methodOverride = require('method-override');
const app = express();

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use('/', routes);

app.use((req, res) => {
  res.render('books/error');
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
  console.log(`http://localhost:${port}`);
});

module.exports = app;
