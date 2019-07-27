const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../models/User');
const Contest = require('../models/Contest');
const auth = require('../middleware/auth');

//@route        GET api/contest
//@description  GET all contests
//@access       PRIVATE 

router.get('/', auth, async (req, res) => {
    try {
        const contestList = await Contest.find({});
        console.log(` This is whats in contestList ${contestList}`)
        res.json(contestList);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


// @route        GET api/contest/id
// @description  GET one contest from the contests page
// @access       PRIVATE 

router.get('/:id', auth, async (req, res) => {
    const id = req.user.id;
    try {
        const contest = await Contest.find({ user: id });
        console.log(contest);
        res.json(contest);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route        POST api/contest
// @description  Add new contest
// @access       Private

router.post('/', [auth], async (req, res) => {
    console.log("post route initiated")

    const { title, description, contestants, contestType } = req.body;
    console.log(req.body);
    try {
        const newContest = new Contest({
            title, description, contestants, contestType, owner: req.user.id
        });
        console.log(newContest);
        const contest = await newContest.save();
        console.log(`this is contest right after the save function ${contest}`)
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
    //build a contest object

    const contestFields = {};
    if (name) contestFields.name = name;
    if (name) contestFields.contestants.push(contestants);

    try {
        let contest = await Contest.findById(req.params.id);

        if (!contest) return res.status(404).json({ msg: 'Contest not found' });

        //make sure user owns contest
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

//@route        DELETE api/contest/:id
//@description  Delete contest
//@access       Private

router.delete('/:id', auth, async (req, res) => {
    try {
        console.log('Delete Contest Request Recieved');

        let contest = await Contest.findById(req.params.id);

        if (!contest) return res.status(404).json({ msg: 'Contest not found' });

        //make sure user owns contest
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