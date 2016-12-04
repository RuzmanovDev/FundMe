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
    likedBy: {
        type: [String]
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: '5841a39980a5674214d8e162'
    },
    target: {
        type: Number,
        required: true
    },
    funded: {
        type: Number
    },
    reporter: {
        type: {}
    },
    isReported: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

campaignSchema.virtual('percentage').get(function() {
    let onePercent = this.target / 100;
    let result = this.funded / onePercent;
    return Math.round(result);
});

mongoose.model('Campaign', campaignSchema);
module.exports = mongoose.model('Campaign');