/*globals */
'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function () {

    let Campaign = require('../models/campaign-model');
    let User = require('../models/user-model');
    let Message = require('../models/message-model');
    let models = { Campaign, User, Message };
    let data = {};

    fs.readdirSync(__dirname)
        .filter(x => x.includes('-data'))
        .forEach(file => {
            let dataModule = require(path.join(__dirname, file))(models);

            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

    return data;
};