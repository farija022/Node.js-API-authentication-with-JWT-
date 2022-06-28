require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
//Import Routes
const authRoute = require("./routes/auth")

//Mongoose connect
mongoose.connect(process.env.DB,
    () => {
        console.log("mongodb connected")
    }, e => console.error(e)
)
//Middleware
app.use(express.json())
//Route Middlewares
app.use("/api/user", authRoute);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is on and running on ${PORT}`)
})