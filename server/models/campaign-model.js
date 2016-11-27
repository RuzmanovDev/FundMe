/* globals require module */

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let campaignSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    createdOn: {
        type: Date,
        required: true
    },
    comments: {
        type: [{}]
    },
    creator: {
        type: {},
        required: true
    },
    donators: {
        type: {},
        required: true
    },
    upVotes: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    target: {
        type: Number,
        required: true
    },
    funded: {
        type: Number
    }
});

mongoose.model('Campaign', campaignSchema);

module.exports = mongoose.model('Campaign');