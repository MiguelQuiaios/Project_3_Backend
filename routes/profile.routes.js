const router = require('express').Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const User = require('../models/User.model');
//const fileUploader = require('../config/cloudinary.config');

/* GET PROFILE */
router.get('/profile/:id', isAuthenticated, async (req, res) => {
      
        try {
        
          const { id } = req.params;
          const seeUser = await User.findById(id)
          res.status(200).json(seeUser);
        } catch (error) {
          console.log(error);
        }
      });

      /* EDIT PROFILE */
router.put('/editprofile/:id', isAuthenticated, async (req, res, next) => {
    const { id } = req.params;
    const { name, interests, img, email } = req.body;
    try {
      const user = await User.findByIdAndUpdate(id,
         { name, interests, img, email }, {new: true});
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

module.exports = router;
