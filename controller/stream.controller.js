const express = require('express');
const baseModel = require('../model/baseString.model');
const upload = require('../routes/app.route');
const app = express();
const fs = require('fs');
const path = require('path');
const multer = require('multer');


const data = function (req, res) {

  //storage
  const storage = multer.diskStorage({
    destination: './img',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +
        path.extname(file.originalname));
    }
  });

  // call upload method
  const upload = multer({
    storage: storage
  }).single('myImg');

  upload(req, res, (err) => {
    if (err) {
      res.json({
        info: 'invalid-data'
      });
    } else {
      var file = req.file.path;
      console.log(file);
      //   function base64_encode(file) {
      //     // read binary data
      var binary = fs.readFileSync(file);
      // convert binary data to base64 encoded string
      var output = new Buffer(binary).toString('base64');
      //  console.log("output ************************** "+ output);
      console.log(output);
      baseModel.findOne({
        url: output
      }, function (err, url) {
        if (err) {
          return res.json({
            success: false,
            info: "Something went Wrong",
            result: err
          });
        }
        if (url) {
          console.log('user', url);
          return res
            .status(400)
            .send({
              info: 'Data exist'
            });
        } else {
          let myobj = {
            url: output,
          }
          baseModel.create(myobj, function (err, res) {
            if (err) throw err;
            console.log("data register");
          })
          return res
            .status(200)
            .send({
              "sucess": "Data inserted sucessfully"
            });
        }
      });
    }
  });

}

module.exports = {
  data: data
}