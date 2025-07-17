const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://shrivastwarishit6:10032006@cluster0.hp75mcc.mongodb.net/"
  )
  .then(async() => await console.log("DataBase connected successfully"))
  .catch((err) => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  password: String,
  isActive: Boolean,
  tags: [String], //Array of strings
  createdAt: { type: Date, default: Date.now },
});

//Create user model
const User = mongoose.model('User', userSchema);

const runQueryExample = async () => {
    // const {name,email,age,password,isActive,tags} = req.body
  try {
    // const newUser = await User.create({
    //   name: "Rishit",
    //   email: "rishit",
    //   age: 22,
    //   password: "Ri",
    //   isActive: true,
    //   tags: ["developer", "designer"]
    // });

    // const newUser = await User({
    //   name: "John Doe",
    //   email: "johndoe",
    //   age: 25,
    //   password: "JD",
    //   isActive: false,
    //   tags: ["developer", "designer"]
    // });

    // await newUser.save()

    // console.log("Created new user ----> " + newUser)

    const allUsers = await User.find()
    console.log(allUsers)

    // const getFilteredUsers = await User.find({isActive: true}) //findOne---> will find the first user
    // //findById --> If by typing just "6878acc9b895ace57e8b8915" from "ObjectId('6878acc9b895ace57e8b8915')"
    // console.log(getFilteredUsers)

    // const getUserById = await User.findById("6878acc9b895ace57e8b8915")
    // console.log("----------> " + getUserById)

    // const getTheRequiredField = await User.find().select("name email -_id")
    // console.log(getTheRequiredField)

    // const getLimitedUsers = await User.find().limit(2).skip(1)
    // console.log(getLimitedUsers)

    // const sortUser = await User.find().sort({age: 1});//-1=>descending order       1=>ascending order
    // console.log(sortUser)

    // const countDocuments = await User.countDocuments({isActive: false})
    // console.log(countDocuments)

    // const deletedUser = await User.findByIdAndDelete('6878acc9b895ace57e8b8915')
    // console.log(deletedUser)
    
    // const updateUser = await User.findByIdAndUpdate('6878a9b0462043ea32396586',{$set: {name: "Ram", email: "ram@gmail.com", age: 10}, $push:{tags: 'updated'}},{new: true})
    // console.log("Updated User --> "+ updateUser)

  } catch (err) {
    console.log("Error ----> " + err);
  } finally{
    await mongoose.connection.close()
  }
};
runQueryExample()
