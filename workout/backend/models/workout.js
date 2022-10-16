const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const workoutModel = mongoose.model("Workout", workoutSchema);

module.exports = workoutModel;