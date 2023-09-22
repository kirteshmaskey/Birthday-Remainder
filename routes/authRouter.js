const express = require("express");
const authRouter = new express.Router();
const User = require("../models/userSchema");
var bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");


// for user registration
authRouter.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    res.status(422).json({ message: "fill all the details" });
  }

  try {
    const preuser = await User.findOne({ email: email.toLowerCase() });

    if (preuser) {
      res.status(422).json({ message: "Email is Already Registered" });
    } else if (password !== cpassword) {
      res.status(422).json({ message: "Password and Confirm Password Not Match" });
    } else {
      const newUser = new User({
        name,
        email: email.toLowerCase(),
        password
      });

      const storeData = await newUser.save();

      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    res
      .status(422)
      .json({ message: error.message });
  }
});


// user Login
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ message: "fill all the details" });
  }

  try {
    const userValid = await User.findOne({ email: email.toLowerCase() });

    if (userValid) {
      const isPasswordCorrect = await bcrypt.compare(password, userValid.password);

      if (!isPasswordCorrect) {
        res.status(422).json({ message: "Incorrect password" });
      } else {
        // token generate
        const token = await userValid.generateAuthtoken();

        // cookiegenerate
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + (3*60*60*100)),
          httpOnly: true,
        });

        const result = {
          userValid,
          token,
        };
        res.status(201).json({ result });
      }
    }else {
      res.status(422).json({ message: "Invalid username" });
    }
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

// user valid
authRouter.get("/validuser", auth, async (req, res) => {
  try {
    const validUser = await User.findOne({ _id: req.userId });
    res.status(201).json({ validUser });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

// user logout

authRouter.get("/logout", auth, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curr) => {
      return curr.token !== req.token;
    });

    res.clearCookie("usercookie", { path: "/" });

    req.rootUser.save();

    res.status(201).json({ status: 201 });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

module.exports = authRouter;
