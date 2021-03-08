const mongoose = require('mongoose');
const User = mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require('jwt-then');

exports.register = async(req, res) => {
    const { name, email, password } = req.body;
    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
    if (!emailRegex.test(email)) throw "email is not support from your domain";
    if (password.length < 6) throw "password must be atlast 6 car";
    const user = new User({
        name,
        email,
        password: sha256(password + process.env.SALT),
    });
    const userChek = await User.findOne({
        email,
        password: sha256(password + process.env.SALT),
    });
    if (userChek) throw "Email already exist";
    await user.save();
    res.json({
        message: "user[" + name + "] registered successfully",
    });
};
exports.login = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password: sha256(password + process.env.SALT)
    });
    if (!user) throw "email and password inccorect !";
    const token = await jwt.sign({ id: user.id }, process.env.SECRET);
    res.json({
        message: "User logged in successfully !",
        token,
    });
};