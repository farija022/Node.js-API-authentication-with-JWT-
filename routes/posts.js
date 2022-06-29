const router = require("express").Router();
const verify = require("./verifyToken")

router.get("/", verify, (req, res) => {
    // res.json({
    //     posts: {
    //         title: "Farija",
    //         description: "Random data you should not access"
    //     }
    // });

    res.send(req.user);
});

module.exports = router;