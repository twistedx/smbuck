const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../models/User');
const Entry = require('../models/Entry');
const auth = require('../middleware/auth');

//@route        GET api/contest
//@description  GET all contests
//@access       PRIVATE 

router.get('/', auth, async (req, res) => {
    const id = req.user.id;
    console.log(`this is the user id from req.user.id:
    ${id}`);
    try {
        const contest = await Contest.find({ user: id }).sort({ date: -1 });
        res.json(entry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


//@route        GET api/contest/id
//@description  GET one contest from the contests page
//@access       PRIVATE 

router.get('/:id', auth, async (req, res) => {
    const id = req.user.id;
    try {
        const contest = await Contest.find({ user: id });
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
    const { name, description, contestants } = req.body;
    try {
        const newContest = new Contest({
            name, description, contestants, creator: req.user.id
        });

        const contest = await newContest.save();
        res.json(contest);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

//@route        PUT api/contest/:id
//@description  Update contest with a user
//@access       Private

router.put('/:id', auth, async (req, res) => {
    const { name, contestants } = req.body;
    //build a entry object

    const contestFields = {};
    if (name) contestFields.name = name;
    if (name) contestFields.contestants.push(contestants);

    try {
        let contest = await Contest.findById(req.params.id);

        if (!contest) return res.status(404).json({ msg: 'Contest not found' });

        //make sure user owns entry
        if (contest.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }
        //FUTURE IMPLMENTATION ADD CHECK TO SEE IF USER IS ALREADY IN CONTEST

        let j = await Contest.findByIdAndUpdate(contest, contestFields, { new: true });

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
        console.log('Delete Contest Request Recieved');

        let contest = await Contest.findById(req.params.id);

        if (!contest) return res.status(404).json({ msg: 'Contest not found' });

        //make sure user owns entry
        if (contest.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }
        await Contest.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Contest Removed' });
        console.log('Contest Removed');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})



module.exports = router;