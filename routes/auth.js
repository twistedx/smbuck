const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const User = require('../models/User');
//@route        GET api/auth
//@description  GET logged in user
//@access       PRIVATE 

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user);

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

//@route        GET api/auth
//@description  GET logged in user
//@access       PRIVATE 

router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.json(user.name);

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

//@route        POST api/auth
//@description  Auth user and get token
//@access       PUBLIC

router.post('/', [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('invalid password');
            return res.status(400).json({ msg: 'Invalid password' });
        }
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        });
        // add a put request to update the last login from user


    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;