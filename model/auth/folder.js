const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const { boolean } = require('webidl-conversions');
const autopopulate = require('mongoose-autopopulate');

const Folderschema = new Schema({
    quizCard:[
        {
            type:Schema.Types.ObjectId,
            ref:"Quizcard",
        }
    ],
    ImageUpload:[
        {
            type:Schema.Types.ObjectId,
            ref:"ImageUpload",
        }
    ],
    VideoUpload:[
        {
            type:Schema.Types.ObjectId,
            ref:"VideoUpload",
        }
    ],
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    color:{
        type:String,
    },
    visibility:{
        type:String,
    },
    image:{
        type:String,
    },



}, { timestamps: true }).plugin(autopopulate);
module.exports = mongoose.model('Folder', Folderschema);