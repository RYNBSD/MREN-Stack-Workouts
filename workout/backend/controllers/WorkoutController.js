const { default: mongoose } = require("mongoose");

const workoutModel = require("../models/workout"); 

const getAllWorkouts = async (req, res) => {
    try {
        const user_id = req.user._id;

        const workouts = await workoutModel.find({ user_id }).sort({createdAt: -1});
        res.status(200).json(workouts);
    }
    catch (e) {
        res.status(400).json({
            Error: e.message
        });
    }
}

const getWorkoutById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json ({
            error: "No such workout"
        });
    }

    try {
        const workout = await workoutModel.findById(id);

        if (!workout) {
            return res.status(404).json({
                error: "Not Found"
            });
        }

        res.status(200).json(workout);
    }
    catch (e) {

    }
}

const addNewWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!load) {
        emptyFields.push('load');
    }
    if (!reps) {
        emptyFields.push('reps');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({
            Error: 'Please fill in all the fields',
            emptyFields
        })
    }

    try {
        const user_id = req.user._id;
        const workout = await workoutModel.create({title, load, reps, user_id});
        res.status(201).json(workout);
    }
    catch (e) {
        res.status(400).json({
            Error: e.message
        });
    }
}

const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json ({
            error: "No such workout"
        });
    }

    try {
        const workout = await workoutModel.findByIdAndUpdate({_id: id}, {
            ...req.body
        });

        if (!workout) {
            return res.status(404).json({
                error: "Not Found"
            });
        }
        res.status(200).json(workout);
    }
    catch (e) {
        res.status(404).json({
            Error: e.message
        });
    }
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json ({
            error: "No such workout"
        });
    }

    try {
        const workout = await workoutModel.findByIdAndDelete({_id: id});

        if (!workout) {
            res.status(400).json({
                error: "No delete",
            })
        }

        res.status(200).json(workout);
    }
    catch (e) {

    }
}

module.exports = {
    getAllWorkouts,
    getWorkoutById,
    addNewWorkout,
    updateWorkout,
    deleteWorkout
}