var router = require("express").Router();
var authRoutes = require("./auth")
var restaurantRoutes = require("./restaurant")
var dashboardRoutes = require("./dashboard")
var locationRoutes = require("./location")
var paymentRoutes = require("./payment")

router.use("/auth", authRoutes);

router.use("/restaurant", restaurantRoutes);

router.use("/dashboard", dashboardRoutes);

router.use("/location", locationRoutes);

router.use("/payment", paymentRoutes);


module.exports = router;