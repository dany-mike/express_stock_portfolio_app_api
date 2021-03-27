// Hash a password with bcrypt
const bcrypt = require('bcrypt');

// Model Object here...
const users = [];

function getUsers(req, res, next) {
    res.json(users);
    res.rawResponse = users;
    return next()
}

async function userLogin(req, res, next) {
    try {
        // Set up the hash
        const salt = await bcrypt.genSalt();
        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        const user = {
            name: req.body.name,
            password: hashedPassword
        }
    
        users.push(user);
        res.rawResponse = res.status(201).send();
        return next();

    } catch (err) {
        res.status(500).send()
        console.log(err)
    }


}

module.exports = {getUsers, userLogin};