const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/auth");

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getSingleUser = async (req, res) => {
  const { id } = req.params; 
  try {
    const user = await User.findById(id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};



module.exports.addUser = async (req, res) => {

  try {
    const { username, email, password } = req.body;

    if (!(email && password && username)) {
      throw new Error("All input is required");
    }
    // Check if the user already exists with the provided email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists with this email" });
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({ username, email, password: encryptedPassword });
    // Save the user to the database
    const savedUser = await newUser.save();

    console.log("Added Successfully...");
    console.log(savedUser);

    const token = generateToken(savedUser._id);

    res.status(201).json({ user: savedUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Authentication successful
    const token = generateToken(user._id);

    res.json({ message: "Login successful", user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

