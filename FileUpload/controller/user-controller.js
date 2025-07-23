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

  req.userToken = asignToken

  // console.log(req.userToken)
  res.json({
    message: "Your token number is given below",
    token: asignToken,
  });
};

const changePassword = async (req,res) => {
  try {
    
    const userId = req.user.userId
    // "username": "John",
    // "email": "john@gmail.com",
    // "contact": 6549873210,
    // "password": "9876543210"


    
    //extract old and new password 
    const {oldPassword, newPassword} = req.body

    //find the user
    const user = await User.findById(userId)

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)

    if (!isPasswordMatch) {
      res.status(400).json({
        message:"Old password in not valid please try again"
      })
    }

    const salt = await bcrypt.genSalt(15)
    const hash = await bcrypt.hash(newPassword, salt)

    //Update user password
    user.password = hash
    await user.save()

    return res.status(200).json({
      message:"Password updated successfully"
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:"Internal server error"
    })
    
  }
}

module.exports = {
  registerUser,
  getUsers,
  loginUser,
  changePassword
};
