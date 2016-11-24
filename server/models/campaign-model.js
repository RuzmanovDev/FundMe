/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let campaignSchema = new Schema({
    createdOn: {
        type: Date,
        required: true
    },
    comments: {
        type: [String],
        required: true
    },
    userCreator: {
        type: String,
        required: true
    },
    donators: {
        type: [String], //name
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    dislikes: {
        type: Number,
        required: true
    },
    categories: {
        type: [String], //name
        required: true
    },
    image: {
        type: String, //url
        required: true
    }
});

mongoose.model("Campaign", campaignSchema);

module.exports = mongoose.model("Campaign");

