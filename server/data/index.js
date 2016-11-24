/*globals */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = function (config) {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.localDB);
    let Campaign = require('../models/campaign-model');
    let models = { Campaign };
    let data = {};

    fs.readdirSync(__dirname)
    .filter(x=> x.includes('-data'))
    .forEach(file => {
        let dataModule = require(path.join(__dirname,file))(models);

        Object.keys(dataModule)
        .forEach(key => {
            data[key] = dataModule[key];
        });
    });
};