const express = require('express');
const baseModel = require('../model/baseString.model');
const fs = require('fs');
var path = require('path');

const app = express();

const dir = './img';

const imgData = function (req, res) {
    // get data from DB 
    baseModel.find({}, function (err, docs) {
        if (err) res.json(err);
        // gives JSON data from docs -> images and transfer to data.jade
        else res.render('data', {
            images: docs
        });
    });

}


module.exports = {
    imgData: imgData
}