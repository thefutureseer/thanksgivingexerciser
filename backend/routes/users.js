const router = require('express').Router();
let User = require('../models/user.model');

// Health Check Route
router.get('/healthcheck', (req, res) => {
  res.send('Backend is up and running');
});

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const username = req.body.username;
  
  // Basic validation
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }
  
  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;