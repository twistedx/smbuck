const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../models/User');
const Entry = require('../models/Entry');

const auth = require('../middleware/auth');

//@route        GET api/entry
//@description  GET all users entry
//@access       PRIVATE 

router.get('/', auth, async (req, res) => {
    const id = req.entry.id;
    console.log(`this is the user id from req.user.id:
    ${id}`);
    try {
        const entry = await Entry.find({ user: id }).sort({ date: -1 });
        res.json(entry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


//@route        GET api/entry/jid
//@description  GET one entry from the user
//@access       PRIVATE 

router.get('/:id', auth, async (req, res) => {
    const id = req.user.id;
    try {
        const entry = await Entry.find({ user: id });
        console.log(entry);
        res.json(entry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})




//@route        POST api/entry
//@description  Add new entry
//@access       Private

router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, team, hasPaid, contestRef, } = req.body;
    try {
        const newEntry = new Entry({
            name, email, phone, team, hasPaid, contestRef, user: req.user.id
        });

        const entry = await newEntry.save();
        res.json(entry);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

//@route        PUT api/entry/:id
//@description  Update entry
//@access       Private

router.put('/:id', auth, async (req, res) => {
    const { name, phone, email, team, hasPaid, contestRef } = req.body;
    //build a entry object

    const entryFields = {};
    if (name) entryFields.name = name;
    if (phone) entryFields.phone = phone;
    if (email) entryFields.email = email;
    if (hasPaid) entryFields.hasPaid = hasPaid;
    if (team) entryFields.team = team;
    if (contestRef) entryFields.contestRef = contestRef;

    try {
        let entry = await Entry.findById(req.params.id);

        if (!entry) return res.status(404).json({ msg: 'Entry not found' });

        //make sure user owns entry
        if (entry.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }
        let j = await Entry.findByIdAndUpdate(entry, entryFields, { new: true });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

})

//@route        DELETE api/entry/:id
//@description  Delete entry
//@access       Private

router.delete('/:id', auth, async (req, res) => {
    try {
        console.log('Delete Entry Request Recieved');

        let entry = await Entry.findById(req.params.id);

        if (!entry) return res.status(404).json({ msg: 'Entry not found' });

        //make sure user owns entry
        if (entry.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }
        await Entry.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Entry Removed' });
        console.log('Entry Removed');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})



module.exports = router;