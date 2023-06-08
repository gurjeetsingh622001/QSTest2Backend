const User = require("../Model/userModel")
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.insertadmin = () => {

    User.findOne({ 'email': 'admin@gmail.com' }).exec()
        .then(user => {
            if (user == null) {
                let userObj = new User()
                userObj.name = 'Admin_gurjeet'
                userObj.email = 'admin@gmail.com'
                userObj.role = 'admin'
                userObj.dob = '2000-02-01T18:30:00.000Z'
                userObj.password = bcrypt.hashSync('admin', saltRounds)
                userObj.save()
                console.log("Admin register")

            } else {
                console.log("Admin already register")
            }
        })
        .catch(err => {
            console.log("Error while adding admin")
        })
}