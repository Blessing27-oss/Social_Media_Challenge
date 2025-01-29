const mongoose = require('mongoose');


const labMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    year: { type: String },
    dev: { type: Boolean },
    des: { type: Boolean },
    pm: { type: Boolean },
    core: { type: Boolean },
    mentor: { type: Boolean },
    major: { type: String },
    minor: { type: String },
    birthday: { type: String },
    home: { type: String },
    quote: { type: String },
    'favorite thing 1': { type: String },
    'favorite thing 2': { type: String },
    'favorite thing 3': { type: String },
    'favorite dartmouth tradition': { type: String },
    'fun fact': { type: String },
    picture: { type: String }
});

const LabMember = mongoose.model('LabMember', labMemberSchema, 'social-media-data');
module.exports = LabMember;