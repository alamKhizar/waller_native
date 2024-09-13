const mongoose = require("mongoose");
const express = require("express");
const  {signupController,loginController,imageHandler, searchForImageController, filterImages } = require("../Controller/userController");
const middlewareAuth = require("../MiddleWare/middlerwereAuth");


const router = express.Router();

//signup
router.post("/register", signupController);

//login
router.post("/login", loginController);

//imageHandler

router.post("/sendImageDetails",middlewareAuth, imageHandler)

//search image
router.get("/searchImage", searchForImageController)

//filter images
router.get("/filterImages/:tags", filterImages)


module.exports = router;