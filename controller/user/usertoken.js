const User = require('../../Model/userModel');
const Survey = require('../../Model/surveyModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SurveyModel = require('../../Model/surveyModel');
const seckretkey = 'gurjeetproject_node';

function userlogin(req, res) {
    const { email, password } = req.body;

    if (!email || email.trim() === '') {
        return res.status(400).json({ message: 'Invalid email' });
    }

    if (!password || password.trim() === '') {
        return res.status(400).json({ message: 'Invalid password' });
    }

    User.findOne({ email }).exec()
        .then(data => {

            if (!data) {
                return res.status(400).json({ message: 'Email does not exist' });
            }

            const role = data.role;

            if (bcrypt.compareSync(password, data.password)) {
                const payload = {
                    name: data.name,
                    email: data.email
                };

                const token = jwt.sign(payload, seckretkey, { expiresIn: 60 * 60 });

                SurveyModel.findOne({ email }).exec()
                    .then(surveyDataExist => {
                        
                        const response = {
                            status: 200,
                            success: true,
                            message: 'User login successful',
                            token,
                            userId: data._id,
                            email: data.email,
                            surveyDataFilled: !!surveyDataExist,
                            role
                        };

                        res.json(response);
                    })
                    .catch(err => {
                        res.status(500).json({
                            status: 500,
                            success: false,
                            message: 'Error occurred while checking survey data: ' + err.toString()
                        });
                    });
            } else {
                res.status(400).json({ message: 'Invalid password' });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                success: false,
                message: 'Error occurred while finding user: ' + err.toString()
            });
        });
}

module.exports = {
    userlogin
};