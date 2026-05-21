const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        msg: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json({
        msg: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      msg: "Login success",
      token,
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminExist = await Admin.findOne({
      email,
    });

    if (adminExist) {
      return res.status(400).json({
        msg: "Admin already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({
      msg: "Admin created successfully",
    });

  } catch (error) {
    res.status(500).json(error);
  }
};