const { Schema, model } = require('mongoose');
const thoughts = require('./thought')

const userSchema = new mongoose.Schema(
    {
        title: { 
        type: String, 
        required: true,
        unique: true,
        trim: true,
        },

        email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
            return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
        },

        },
        thoughts: [thoughts],

        friends: [userSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends;
    })
    .set(friends.length)

const friendCount = model('user', userSchema)

module.exports = {userSchema, friendCount};