const { model } = require("mongoose");
const User = require("../db/user"); // Corrected the path
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

async function registerUser(model) {
  const hashPassword = await bcrypt.hash(model.password, 10);

  let user = new User({
    name: model.name,
    email: model.email,
    password: hashPassword,
  });

  await user.save();
}


async function loginUser(model) {
    const user = await User.findOne({ email: model.email });
    
    if (!user) {
      return null;
    }

    console.log(user,model.password, user.password);
    const isMatched = await bcrypt.compare(model.password, user.password);

    if (isMatched) {
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            },
            "secret",
            {
                expiresIn: "1h",
            }
        );
        return {token , user};

            } else {
      return null;
    }
  }

module.exports = { registerUser,loginUser };
