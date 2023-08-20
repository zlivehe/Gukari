const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: [3, 'Too short'],
    max: [50, 'Too long']
  },
  imageUrl:{
    type: String,
    required: false,
  },

  description: {
    type: String,
    required: false,
    max: [500, 'Too long'],        
  },
  plays: {
    type: Number,
    default: 0
  },
  saves: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    default: []
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  user: {
    type: String,
  },
  viewcount:{
    type:Number,
        default: 0

  },
  category: {
    type: String,
    enum: ['general', 'technology', 'education', 'health', 'sports', 'food', 'business', 'art'],
    required: true,
  },
  tags: [
    {
      name: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      }
    }
  ],
  // color: {
  //   type: String,
  //   default: 'white',
  //   required: false,
    
  // },
  
  cards: {
    required: false,
    type: [{
      term: String,
      position: Number,
      image: String,
      imageUrl: String,
      definition: String,
    }],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Quizcard', cardSchema);
