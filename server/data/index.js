/*globals */
 'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
module.exports = function (config) {
    let Campaign = require('../models/campaign-model');
    let User = require('../models/user-model');
    let models = { Campaign,User };
    let data = {};
    mongoose.Promise = global.Promise;
    mongoose.connect(config.localDB);
    fs.readdirSync(__dirname)
    .filter(x => x.includes('-data'))
    .forEach(file => {
        let dataModule = require(path.join(__dirname,file))(models);

        Object.keys(dataModule)
        .forEach(key => {
            data[key] = dataModule[key];
        });
    });

    return data;
};