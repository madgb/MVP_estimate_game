const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const itemSchema = new mongoose.Schema({
    idx: Number,
    price: Number,
    errorAverage: Number,
    dashed: Number,
    image: String,
    link: String,
    name: String
  });

  // { submitPrice: '100',
  // itemIdx: 196312,
  // realPrice: 16.41,
  // dashed: 1,
  // errorPercent: 509.38452163315054 }
  
  const Item = mongoose.model('Item', itemSchema);
  
  module.exports = Item;