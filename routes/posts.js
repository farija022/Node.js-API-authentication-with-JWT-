const router = require("express").Router();


router.get("/", (req, res) => {
    res.json({
        posts: {
            title: "Farija",
            description: "Random data you should not access"
        }
    });
});

module.exports = router;