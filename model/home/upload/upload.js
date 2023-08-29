const mongoose = require('mongoose');
const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
    user: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  });
  
  const UploadSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['general', 'technology', 'education', 'health', 'sports', 'food', 'business', 'art'],
      required: true,
     
    },
    author: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    Videourl:[
      {
        type: Schema.Types.ObjectId,
        ref: 'Videos',
      },
    ],
    imageurl:{
      required: true,
        type: String
    },
    visability:{
      type: String
    },
    viewcount:{
      type:Number
    },
    description: {
      type: String,
      required: true,
    },
    
  
    comments: [commentSchema],
  });
module.exports = mongoose.model('ImageUpload',UploadSchema)