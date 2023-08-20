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
    
  
    comments: [commentSchema],
  });
module.exports = mongoose.model('ImageUpload',UploadSchema)