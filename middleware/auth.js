const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const secretkey = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const verifytoken = jwt.verify(token, secretkey);
    const rootUser = await User.findOne({ _id: verifytoken._id });

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (error) {
    res.status(403).json({ message: "Unauthorized user" });
  }
};

module.exports = auth;
