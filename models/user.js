const { Schema, model } = require('mongoose');
const { thoughtSchema } = require('./thought')

const userSchema = new Schema(
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
        thoughts: [thoughtSchema],

        friends: [this],
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
        return this.friends.length;
    })

const User = model('user', userSchema)

module.exports = User;