const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user-model");

const registerUser = async (req, res) => {
  const { username, email, contact, password, role } = req.body;

  const checkExistingUser = await User.findOne({
    $or: [{ username }, { email }, { contact }],
  });

  console.log(checkExistingUser);

  if (checkExistingUser) {
    return res.json({
      message: "User already exists",
      //   details: checkExistingUser,
    });
  }
  try {
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(password, salt);

    const createUser = new User({
      username,
      email,
      contact,
      password: hash,
      role
    });

    await createUser.save();
    res.json({
      message: "User Created Successfully",
      username,
      email,
      contact,
    });
  } catch (err) {
    res.json({
      message: "Error detected"
    });
    console.log(err)
  }
};

const getUsers = async (req, res) => {
  const allUsers = await User.find();
  res.json(allUsers);
};

const loginUser = async (req, res) => {
  const { username, email, contact, password } = req.body;

  const checkExistingUser = await User.findOne({
    $or: [
      { username },
      { email },
      { contact }
    ],
  });

  if (!checkExistingUser) {
    return res.json({
      message: "No such user found",
    });
  }

  const checkPassword = bcrypt.compareSync(
    password,
    checkExistingUser.password
  );
  if (!checkPassword) {
    return res.json({
      message: "Incorrect username, email , contact or password",
    });
  }

  const asignToken = jwt.sign(
    {
      userId: checkExistingUser._id,
      username: checkExistingUser.username,
      role: checkExistingUser.role,
    },
    process.env.JWT_SECRET_KEY//,
    // {
    //   expiresIn: "15m",
    // }
  );

  res.json({
    message: "Your token number is given below",
    token: asignToken,
  });
};

module.exports = {
  registerUser,
  getUsers,
  loginUser,
};
