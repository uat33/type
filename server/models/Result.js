const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const resultSchema = new Schema(
    {
        wpm: {
            type: Number,
            required: true,
            min: 0,
        },
        accuracy: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        completedWords: {
            type: Number,
            required: true,
            min: 0,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        time: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    {
        timestamps: true, // Add createdAt and updatedAt fields automatically
    }
);

module.exports = model("Result", resultSchema);
