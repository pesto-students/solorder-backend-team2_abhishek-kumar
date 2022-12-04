var router = require("express").Router();
var authRoutes = require("./auth")
var restaurantRoutes = require("./restaurant")
var dashboardRoutes = require("./dashboard")

router.use("/auth", authRoutes);

router.use("/restaurant", restaurantRoutes);

router.use("/dashboard", dashboardRoutes);


module.exports = router;