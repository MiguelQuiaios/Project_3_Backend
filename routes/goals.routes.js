const router = require('express').Router();
const Goals = require('../models/Goals.model');
const Groups = require('../models/Groups.model');


router.post('/goals/:groupId', async (req, res, next) => {
  try {
    const { title, description, img } = req.body;
    const {groupId} = req.params

    const newGoal = await Goals.create({ title, description, img});
    await Groups.findByIdAndUpdate(groupId, {
      $push:{
        goals: newGoal._id
      }
    })
console.log(newGoal._id)
    res.status(201).json(newGoal);
  } catch (error) {
    res.json(error);
    next(error);
  }
});

//Get all route

router.get('/goals', async (req, res, next) => {

  try {
    const allGoals = await Goals.find().populate('members');
    //the name of the variable doesn't matter for the client
    res.status(200).json(allGoals);
  } catch (error) {
    next(error);
  }
});

//Get single project

router.get('/goals/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    // const id = req.params.id

    const singleGoal = await allGoals.findById(id)
    res.status(200).json(singleGoal);
  } catch (error) {
    next(error);
  }
});

//Edit / Put route

router.put('/goals/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, img } = req.body;

    const updatedGoal = await Goals.findByIdAndUpdate(
      id,
      { title, description, img },
      //new: true gives us back the updated object instead of the old version
      { new: true }
    );

    res.status(200).json(updatedGoal);
  } catch (error) {
    next(error);
  }
});

//Delete route

router.delete('/goals/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await Goals.findByIdAndRemove(id);

    res.status(200).json({ message: `The goal with the id ${id} was deleted successfully` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;