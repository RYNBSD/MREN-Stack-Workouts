const express = require("express");

const {
    getAllWorkouts,
    getWorkoutById,
    addNewWorkout,
    updateWorkout,
    deleteWorkout
} = require("../controllers/WorkoutController");

const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

//GET
router.get('/', getAllWorkouts);

router.get('/:id', getWorkoutById);

//POST
router.post('/', addNewWorkout);

//PATCH
router.patch('/:id', updateWorkout);

//DELETE
router.delete('/:id', deleteWorkout);

module.exports = router;