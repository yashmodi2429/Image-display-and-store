const express = require('express');
const app = express();

const approute = require('./routes/app.route');
const mongoDb = require('./connection/dbConnect');
const path = require('path');


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


const start = function () {
  mongoDb.connect()
    .then(startServer)
    .catch(function (err) {
      console.error(err);
    })
}
const startServer = function () {
  return app.listen(27017, function () {
    console.info('Mongodb is running on the port : 27017');
  });
}

app.use('/api', approute);

app.use('/', express.static(path.join(__dirname, 'views')));
// app.use(express.static('views'));
app.listen(3000);


module.exports = {
  start: start
};