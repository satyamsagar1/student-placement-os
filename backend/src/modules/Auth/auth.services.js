const Users = require("../User/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (name, email, password) => {

  const existingUser = await Users.findOne({ email });

  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await Users.create({
    name,
    email,
    passwordHash,
  });

  return {
    id: newUser._id,
    email: newUser.email,
  };
};

const loginUser = async (email, password) => {
    const user = await Users.findOne({ email });
    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: "1d",});

    return {token, user:{id: user._id, name: user.name, email: user.email}}; 
  };


const me = async (userId) => {

    const user = await Users.findById(userId).select("-passwordHash");

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return {id: user._id, name: user.name, email: user.email};

}  

module.exports = { registerUser, loginUser, me };
