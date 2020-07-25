require('./config/config');
require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const idxRouter = require('./routes/index.router');

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', idxRouter);

app.all('*', (req, res, next) => {
  /*
 *   res.status(404).json({
 *       status: 'fail',
 *           message: `Can't find ${req.originalUrl} on this server!`
 *             });
 *               */
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  
  next(err);
});


/*app.use((err, req, res, next) =>{
	if(err.name == 'ValidationError'){
		var valErrs = [];
		Object.keys(err.errors).forEach(key => valErrs.push(err.errors[key].message));
		res.status(422).send(valErrs);
	}
});
*/
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

app.listen(process.env.PORT, () =>
	console.log(`Server started at : ${process.env.PORT}`)
);
