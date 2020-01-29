const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        USER_ID: { type: String,
        unique: true },
        REGISTERED_MOBILE: { type: Number },
        FIRST_NAME: { type: String },
        LAST_NAME: { type: String }
    }
);

module.exports = mongoose.model('user', userSchema);