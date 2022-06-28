const bcrypt = require('bcryptjs');
const router = require("express").Router();
const User = require("../models/user");
const { registerValidation, loginValidation } = require("../validation");


router.post("/register", async (req, res) => {
    //Lets Validate The Data before We made a User
    //const validation = Joi.validate(req.body, schema);

    //const { error } = Joi.validate(req.body, schema);
    //res.send(error.details[0].message)

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if The User is already exists 
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send("Email already exists");

    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const saveUser = await user.save();
        res.send(saveUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/login", async (req, res) => {
    //Lets Validate The Data before We made a User
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if The Email is already exists 
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email is not found");

    //Password is Correct 
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send("Invalid Password")

    res.send("Logged In!")

})
module.exports = router;