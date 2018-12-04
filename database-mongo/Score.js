const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const scoreSchema = new mongoose.Schema(
    {
        name: {type: String, default: 'Guest'},
        score: Number
    },
    {timestamps: true}
  );

  // { submitPrice: '100',
  // itemIdx: 196312,
  // realPrice: 16.41,
  // dashed: 1,
  // errorPercent: 509.38452163315054 }
  
  const Score = mongoose.model('Score', scoreSchema);
  
  module.exports = Score;