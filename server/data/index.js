/*globals */
'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = function(config){
    mongoose.Promise = global.Promise;
};