const { BadRequest } = require('../errors');
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body;
    // mongoose validation
    // Joi
    // Check in the controller 
    if (!username || !password) { throw new BadRequest('Please provide email and passord'); }

    // Just for demo, normally provided by DB!!!
    const id = new Date().getDate();

    // Try to keep payload small , better experience for user
    // Just for demo, in Prodeuction use long and complex and unguessable string value!!!
    // Jwt - we need to provide three things - payload , secret , options 
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET);
    // console.log(token);

    res.status(200).json({ msg: 'user ceated', token });
}

const dashboard = async (req, res) => {
    const { username } = req.user;
    const luckyNum = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hello ${username}`, secret: `Here is your authorized data and your lucky number is ${luckyNum}` })
}

module.exports = {
    login,
    dashboard
}