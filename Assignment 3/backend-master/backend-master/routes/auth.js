const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findOne } = require("../models/User");
const fetchUser = require("../middleware/fetchuser");

const JWT_SECRET = "dhfkbdfdbcdh";

// ROUTE 1: CREATE USER

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success , errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success: success , msg: "User Already Exists"});
      }
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success , token });
    } catch (error) {
      console.log(error.message);
      res.send("Some Internal error occured");
    }
  }
);

// ROUTE 2: USER LOGIN

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Please enter correct Email");
    }
    const passCmp = await bcrypt.compare(password, user.password);
    if (!passCmp) {
      return res.status(400).send("Please enter correct Password");
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(400).send("Some Internal Error Occured");
  }
});

// ROUTE 3: GET LOOGED IN USER DETAILS

router.post("/userdetails", fetchUser , async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(400).send("Some Internal Error Occured");
  }
});

module.exports = router;
