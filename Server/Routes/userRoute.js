const mongoose = require("mongoose");
const express = require("express");
const  {signupController,loginController,imageHandler, searchForImageController } = require("../Controller/userController");
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


module.exports = router;