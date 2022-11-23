var router = require("express").Router();
var authRoutes = require("./auth")

router.use("/auth", authRoutes);


module.exports = router;