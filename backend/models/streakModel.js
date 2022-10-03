const mongoose = require('mongoose')

const streakSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        text: {type: String,required: [true, 'Please add a text value']},
        count: {type: Number,required: true,default: 0},
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Streak', streakSchema)