// import User from "../Model/userModel";
const User = require("../Model/userModel");
const mongoose = require("mongoose");
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const { WallpaperDetails } = require("../Model/WallpaperDetails");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  console.log("===== SIGNUP CONTROLLER ====");
  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    console.log("===== SIGNUP CONTROLLER ====");
    const createNewUser = await User.create({ name, email, password });
    const token = jwt.sign(
      { id: createNewUser._id, email: createNewUser.email },
      process.env.JWT_SECRET
    );
    console.log("Token = " + token);

    const AUTH_TOKEN = res.setHeader("Authorization", `Bearer ${token}`);

    console.log("Auth token = " + AUTH_TOKEN);
    return res
      .status(200)
      .json({ message: "User created successfully", token });
  } catch (err) {
    console.log(err);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  console.log("===== LOGIN CONTROLLER ====");

  try {
    const user = await User.findOne({ email });

    //just getting id and fetching the name of user
    const user_data_for_username = await User.findById(user._id);
    console.log("User data for username = " + user_data_for_username.name);
    const userName = user_data_for_username.name;

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );
    console.log("Token = " + token);

    const AUTH_TOKEN = res.setHeader("Authorization", `Bearer ${token}`);

    console.log("Auth token = " + AUTH_TOKEN);

    return res
      .status(200)
      .json({ message: "User logged in successfully", token, userName });
  } catch (err) {
    console.log(err);
  }
};

const imageHandler = async (req, res) => {
  const { title, imageUrl, tags, userId } = req.body;

  console.log(title, imageUrl, tags, userId);

  const user = await User.findById(userId);

  console.log("Username = " + user.name + " User ID = " + user._id);

  const data = await WallpaperDetails.create({
    title,
    imageUrl,
    tags,
    uploader: {
      username: user.name,
      userId,
    },
  });

  return res.status(200).json({ message: "Image Record Added successfully" });
};

const searchForImageController = async (req, res) => {

  try{
    //populate the WallpaperDetails record all
    const data = await WallpaperDetails.find({});
    
    data.forEach((item) => {
      console.log("image url : "+ item.imageUrl + "User id : "+ item._id);
    });

    return res.status(200).json({ message: "Data fetched successfully", data:data});
  }catch(error)
  {
    console.log(error);
  }

}


//search images by tags!
const filterImages = async (req,res) =>
  {
    const {tags} = req.params;

    const data = await WallpaperDetails.find({tags});

    return res.status(200).json({message:"Data fetched successfully",data:data});
  }

module.exports = { signupController, loginController, imageHandler,searchForImageController , filterImages};
