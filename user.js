var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    yourName: {
        type: String,
    },
    number: {
        type: String,
        default: ''
    },
    service: {
        type: String,
        default: ''
    },
    comment: {
        type: String,
        default: ''
    },

    // TableType: {
    //     type: String,
    //     default: ''
    // },
    // Placement: {
    //     type: String,
    //     default: ''
    // },
    // Date: {
    //     type: String,
    //     default: ''
    // },
    // time:{
    //     type: String,
    //     default: ''
    // },
    //
    // Note: {
    //     type: String,
    //     default: ''
    // },
});
var user = new mongoose.model('User', schema);

module.exports = user;