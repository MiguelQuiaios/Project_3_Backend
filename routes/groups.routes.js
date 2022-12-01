const router = require('express').Router();
const Groups = require('../models/Groups.model');
const User = require('../models/User.model')


router.post('/groups', async (req, res, next) => {
  try {
    const { title, description, members } = req.body;

    const newGroups = await Groups.create({ title, description, members});

    res.status(201).json(newGroups);
  } catch (error) {

    res.json(error);
    next(error);
  }
});

//Get all route

router.get('/groups', async (req, res, next) => {
  try {
    const allGroups = await Groups.find().populate('chat members');
    res.status(200).json(allGroups);
    /* a */
  } catch (error) {
    next(error);
  }
});

//Get single group

router.get('/groups/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const singleGroup = await Groups.findById(id).populate('chat members goals')
    .populate({
      path: 'chat',
      populate: {
        path: 'sender',
      model: 'User'  
      }
    })
    res.status(200).json(singleGroup);
  } catch (error) {
    next(error);
  }
});

//Edit / Put route

router.put('/groups/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description,} = req.body;

    const updatedGroup = await Groups.findByIdAndUpdate(
      id,
      { title, description, },
      //new: true gives us back the updated object instead of the old version
      { new: true }
    );

    res.status(200).json(updatedGroup);
  } catch (error) {
    next(error);
  }
});

//Delete route

router.delete('/groups/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await Groups.findByIdAndRemove(id);

    res.status(200).json({ message: `The group with the id ${id} was deleted successfully` });
  } catch (error) {
    next(error);
  }
});

router.get('/groups/members', async (req, res, next) => {
  try {
    const allUsers = await User.find()
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
