const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/mvp-estimate';

const db = mongoose.connect(mongoUri);
module.exports = db;


// db.on('error', function() {
//   console.log('mongoose connection error');
// });

// db.once('open', function() {
//   console.log('mongoose connected successfully');
// });

// module.exports = db;

// var selectAll = function(callback) {
//   Item.find({}, function(err, items) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };
