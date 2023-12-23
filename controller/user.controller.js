
const User = require('../model/user.modle');

module.exports.create = async function (req, res) {
    try {
        const user = User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).send("User is already registered")
        }
        await User.create(req.body);
        return res.status(201).send("Register successfully")
    } catch (err) {
        console.log("Error in signup", err);
        res.status(500).send("Something went wrong");
    }
}

module.exports.createSession = function (req, res) {
    return res.status(200).send('You have sign in successfully !');

}


