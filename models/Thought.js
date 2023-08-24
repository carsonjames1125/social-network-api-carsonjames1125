// import schema and moment for the time

const { Schema, model, Types } = require('mongoose');

const moment = require('moment');

//starting with the reaction schema 

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 250
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // pulling moment into the app to get the timestamp
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
        },

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

// thought schema next...

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlenth: 250,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

//accessing total amount of friends for a user 

thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})


// user model creation using userschema

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;