//Packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const app = express();

app.use(cors());
app.use(express.json());

//My Files
const workoutRouter = require("./routes/workout");
const userRouter = require("./routes/user");

app.use('/api/workouts', workoutRouter);
app.use('/api/user', userRouter);

app.use('*', (req, res) => {
    res.status(404).json({
        error: "Forbidden",
    })
})

mongoose.connect(process.env.MONGO_DB_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`connected port${process.env.PORT}`);
    })
}).catch((e) => console.error(e));