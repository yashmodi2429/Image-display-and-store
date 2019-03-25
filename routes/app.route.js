const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const streamController = require('../controller/stream.controller');
const imgController = require('../controller/img.controller');




console.log("Route");

// to parse the data from post request
router.use(bodyParser.urlencoded({
  extended: false
}));

router.use(bodyParser.json());

router.use(function (error, req, res, next) {
  if (error) {
    res.send('Invalid Json');
  }
})




// routes 
// to insert data in database
router.post('/data', streamController.data);

// get data from the database
router.get('/img',imgController.imgData );


module.exports = router;
