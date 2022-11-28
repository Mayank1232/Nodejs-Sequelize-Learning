const db = require("../models");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = db.user;

// register user

const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  // already existing user
  const alreadyExistingUser = await User.findOne({
    where: { email },
  }).catch((err) => {
    console.log("ERROR: ", err);
  });

  if (alreadyExistingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  // new user

  const newUser = new User({ fullName, email, password });
  const savedUser = await newUser.save();

  if (savedUser) {
    res.json({ message: "Thanks for registering" });
  } else {
    res.json({ message: "Cannot register user" });
  }
};

// list of register users

const usersList = async (req, res) => {
  const users = await User.findAll({});
  res.json(users);
};

// user login

const login = async (req, res) => {
  const { email, password } = req.body;

  // already existing user
  const alreadyExistingUserEmail = await User.findOne({
    where: { email },
  }).catch((err) => {
    console.log("ERROR: ", err);
  });

  if (!alreadyExistingUserEmail) {
    return res.status(400).json({
      message: "Email or password dosen't match",
    });
  }

  if (alreadyExistingUserEmail.password !== password) {
    return res.status(400).json({
      message: "Email or password dosen't match",
    });
  }
  // jwt token
  const token = jwt.sign(
    {
      id: alreadyExistingUserEmail.id,
      email: alreadyExistingUserEmail.email,
    },
    process.env.JWT_SECRET
  );

  res.json({ message: "Welcome back", token: token });
};

// send email using nodemailer

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "parmarmayank115@gmail.com", // here use your real email
    pass: "idrgoggvftsllxkv", // put your password correctly (not in this question please)
  },
});

const sendEmail = async (req, res) => {
  const { email, subject, message } = req.body;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "admin@gmail.com", // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
    html: `<b>${message}</b>`, // html body
  });

  transporter.sendMail(info, (err, data) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      console.log("Email sent");
    }
  });

  res.status(200).json({ message: "Email sent successfully" });
};

module.exports = {
  register,
  usersList,
  login,
  sendEmail,
};
