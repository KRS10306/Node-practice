const userModel = require("../models/users-model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register user
const registerUser = async (req, res) => {
  try {
    // res.json(req.body)
    const { username, email, password, contact } = req.body;

    const checkExistingUser = await userModel.findOne({
      $or: [{ username }, { email }, { contact }],
    });
    if (checkExistingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    // Store hash in your password DB
    const createUser = new userModel({
      username,
      email,
      password: hash,
      contact,
    });
    await createUser.save();
    res.json({
      message: "User created successfully! Check users details",
      details: createUser,
    });
  } catch (err) {
    console.error("-----> " + err);
  }
};

//login controller
const loginCheck = async (req, res) => {
  try {
    // Load hash from your password DB
    const { username, password, email, contact } = req.body;
    const findUser = await userModel.findOne({
      $or: [{ username }, { email }, { contact }],
    });
    if (findUser) {
      const check = bcrypt.compareSync(password, findUser.password); // true
      if (check) {
        const accessToken = jwt.sign(
          {
            userId: findUser._id,
            username: findUser.username,
            role: findUser.role,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "15m",
          }
        );
        res.json({
          message: "User Logged in",
          findUser,
          accessToken
        });
      } else {
        res.json({
          message: "Wrong password",
        });
      }
    }
    // if (comparePass) {

    // } else {
    //     res.json({
    //         message: "Wrong username or password"
    //     })
    // }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong! please try again",
    });
  }
};

// {
//     "username": "Rishit",
//     "password": "123456"
// }

const getUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    if (allUsers) {
      res.json({
        message: "All the Users details are given below",
        details: allUsers,
      });
    } else res.json({ message: "No user" });
  } catch (err) {
    console.error("Cannot fetch users because ---> " + err);
  }
};

module.exports = {
  registerUser,
  loginCheck,
  getUsers,
};
