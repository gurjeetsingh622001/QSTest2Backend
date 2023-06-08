const User = require('../../Model/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// function addUser(req, res) {
//     validaters = ''
//     if (req.body.name == undefined || req.body.name == '') {
//         validaters += 'invalid name'
//     }
//     if (req.body.email == undefined || req.body.email == '') {
//         validaters += 'invalid email'
//     }
//     if (req.body.phone == undefined || req.body.phone == '') {
//         validaters += 'invalid phone'
//     }
//     if (req.body.dob == undefined || req.body.dob == '') {
//         validaters += 'invalid dob'
//     }
//     if (req.body.state == undefined || req.body.state == '') {
//         validaters += 'invalid state'
//     }
//     if (req.body.country == undefined || req.body.country == '') {
//         validaters += 'invalid country'
//     }
//     if (req.body.password == undefined || req.body.password == '') {
//         validaters += 'invalid password'
//     }
//     if (!!validaters) {
//         res.json({
//             'message': validaters
//         })
//     }
//     else {
//         User.findOne({ 'email': req.body.email }).exec()
//             .then(user => {
//                 if (user == null || user == '') {
//                     let userobj = new User()
//                     userobj.name = req.body.name
//                     userobj.email = req.body.email
//                     userobj.phone = req.body.phone
//                     userobj.password = bcrypt.hashSync(req.body.password, saltRounds)
//                     userobj.dob = req.body.dob
//                     userobj.address.state = req.body.state.name
//                     userobj.address.country = req.body.country.name
//                     userobj.save()

//                     res.json({
//                         'status': 200,
//                         'success': true,
//                         'message': 'user registered',
//                     })
//                 }
//                 else {
//                     res.json({
//                         'status': 200,
//                         'success': false,
//                         'message': 'email already exists'
//                     })
//                 }

//             })
//             .catch(err => {
//                 res.json({
//                     'status': 500,
//                     'success': false,
//                     'message': String(err) + 'error'
//                 })

//             })

//     }
// }

function addUser(req, res) {
    let errors = [];
  
    if (!req.body.name) {
      errors.push('Invalid name');
    }
    if (!req.body.email) {
      errors.push('Invalid email');
    }
    if (!req.body.phone) {
      errors.push('Invalid phone');
    }
    if (!req.body.dob) {
      errors.push('Invalid date of birth');
    }
    if (!req.body.state) {
      errors.push('Invalid state');
    }
    if (!req.body.country) {
      errors.push('Invalid country');
    }
    if (!req.body.password) {
      errors.push('Invalid password');
    }
  
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors
      });
    }
  
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(200).json({
            success: false,
            message: 'Email already exists'
          });
        }
  
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: bcrypt.hashSync(req.body.password, saltRounds),
          dob: req.body.dob,
          address: {
            state: req.body.state.name,
            country: req.body.country.name
          }
        });
  
        newUser.save()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'User registered'
            });
          })
          .catch(err => {
            return res.status(500).json({
              success: false,
              message: 'Error while saving user',
              error: err.message
            });
          });
      })
      .catch(err => {
        return res.status(500).json({
          success: false,
          message: 'Error while checking email',
          error: err.message
        });
      });
  }
  

module.exports = {
    addUser
}