const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res) => {
        try {
            if (!req.body.username || !req.body.password) {
                return res.status(400).json({
                    message: 'required_fields_are_missing'
                });
            }
            const exists = await UserModel.findOne({
                username: req.body.username
            });
            if (exists) {
                return res.status(409).json({
                    message: 'user_already_exists'
                });
            }
            const hashPassword = bcrypt.hashSync(req.body.password, 10);

            const savedUser = await new UserModel({
                username: req.body.username,
                password: hashPassword,
                permits: req.body.permits
            }).save();

            const token = jwt.sign({
                id: savedUser._id,
                username: savedUser.username,
                permits: savedUser.permits
            }, process.env.SECRET_KEY);

            res.json({ token });

        } catch (err) {
            console.log(err)
            res.status(500).send(err);
        }
    },
    login: async (req, res) => {
        try {
            const user = await UserModel.findOne({
                username: req.body.username
            });
            if (!user) {
                return res.status(404).json({
                    message: 'user_not_found'
                });
            }
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({
                    id: user._id,
                    username: user.username,
                    permits: user.permits
                }, process.env.SECRET_KEY);
    
                res.json({ token });
            } else {
                return res.status(404).json({
                    message: 'user_not_found'
                });
            }
        } catch (err) {
            console.log(err)
            res.status(500).send(err);
        }
    }
}