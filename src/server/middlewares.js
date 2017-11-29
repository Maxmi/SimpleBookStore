const errorHandler = (err, req, res, next) => {
  res.status(500).send('Something bad happened. This page should be nicer looking');
};

const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

const notFoundHandler = (req, res) => {
  res.status(404).render('common/error');
};

const setDefaultResponseLocals = (req, res, next) => {
  res.locals.query = '';
  next();
};


module.exports = {
  errorHandler,
  logErrors,
  notFoundHandler,
  setDefaultResponseLocals
};
