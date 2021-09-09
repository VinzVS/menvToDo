const mongoose = require('mongoose');
const { Schema } = mongoose;

     const Record = new Schema({
        valueInput: String,
        need: Boolean,
     });
module.exports = mongoose.model('Record', Record);