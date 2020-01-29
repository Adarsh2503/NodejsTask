const mongoose = require('mongoose');

const { Schema } = mongoose;

const userRoleSchema = new Schema(
    {
        USER_ID: { type: String,
                      unique: true },
        USER_ROLE: { type: String}
    }
);

module.exports = mongoose.model('userRole', userRoleSchema);