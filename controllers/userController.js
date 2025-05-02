const UserService = require('../services/userService');

exports.register = async (req, res) => {
  try {
    const user = await UserService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.message === 'Email already in use') {
      res.status(409).json({ message: error.message }); 
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

exports.login = async (req, res) => {
  try {
    const data = await UserService.login(req.body);
    res.status(200).json(data);
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      res.status(401).json({ message: error.message }); 
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};