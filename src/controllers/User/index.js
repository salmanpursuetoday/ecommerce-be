const User = require('../../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

exports.createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, password, contactNo, } = req.body;
    const match = await User.findOne({ email: req.body.email });
    if (match) return res.status(400).json({ message: "user already exits" });
    else {
      const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        contactNo: contactNo,
      }
      const newUser = await User.create(user);
      if (!newUser) return res.status(400).json({ message: "Something went wrong, User could not saved" });
      const token = jwt.sign({
        firstName: newUser?.firstName,
        lastName: newUser?.lastName,
        email: newUser?.email,
        password: newUser?.password,
        contactNo: newUser?.contactNo,
        role: newUser?.role,
      }, process.env.JWT_KEY, { expiresIn: '1d' });
      res.status(200).json({ token: token })
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


exports.deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteUser = await User.findOneAndDelete({ _id: _id });
    if (deleteUser) return res.status(200).json(deleteUser)
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}


exports.getCustomers = async (req, res) => {
  try {
    const users = await User.find({role: 'customer'});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}


exports.updateUser = async (req, res) => {
  try {
    const { _id, firstName, lastName, email, contactNo, } = req.body;
    const updatedUser = await User.findOneAndUpdate({ _id: _id }, { firstName, lastName, email, contactNo }, { new: true });
    if (updatedUser) return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}


exports.creteAdmin = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("password", Number(process.env.SALT));
    const superAdmin = await User.create({
      firstName: "admin",
      lastName: "admin",
      email: "admin@admin.com",
      password: hashedPassword,
      contactNo: "+923238427983",
      role: "admin",
    });
    return res.status(200).json(superAdmin)
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

exports.createVendor = async (req, res) => {
  try {
    const { firstName, lastName, email, password, contactNo } = req.body;
    const match = await User.findOne({ email: req.body.email });
    if (match) return res.status(400).json({ message: "Vendor already exits" });
    else {
      const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        contactNo: contactNo,
        role: 'vendor'
      }
      const newUser = await User.create(user);
      if (!newUser) return res.status(400).json({ message: "Something went wrong, Vendor could not saved" });
      return res.status(200).json(newUser)
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.getVendors = async (req, res) => {
  try {
    const users = await User.find({role: 'vendor'});
    return res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const token = jwt.sign({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          contactNo: user.contactNo,
          role: user.role,
        }, process.env.JWT_KEY, { expiresIn: '1d' });
        res.status(200).json({ token: token })
      } else {
        res.status(400).json({ message: "invalid password" });
      }
    } else {
      return res.status(400).json({ message: "invalid email" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}