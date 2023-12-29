const express = require('express');
const router = express.Router();
const bd = require('../models/birthdaySchema');
const auth = require('../middleware/auth');

router.post('/set-dob',auth, async (req, res) => {
  try {
    const { name, email, phone, dob} = req.body;
    const userId = req.rootUser._id;
    const saveData = new bd({
      userId, name, phone, 
      dob: new Date(dob),
      email: email.toLowerCase()
    });
    const savedData = await saveData.save(); 

    res.status(201).json({ message: "Remainder set successfully" });
  } catch (error) {
    res.status(422).json({ message: "Something went wrong" });
  }
});


router.get('/get-all-dobs', auth, async (req, res) => {
  const userId = req.userId;
  try {
    const data = await bd.find({userId: userId}, {_id:0, __v:0, userId:0});
    res.status(201).json({ data: data });
  } catch (error) {
    res.status(422).json({ message: "Something went wrong" });
  }
});



module.exports = router;