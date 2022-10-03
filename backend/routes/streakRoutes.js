const express = require('express');
const router = express.Router();
const streakController = require('../controllers/streakController');
const {authorize} = require('../middleware/authMiddleware');


router.route('/').get(authorize, streakController.getStreaks).post(authorize, streakController.createStreak);
router.route('/:id').put(authorize, streakController.updateStreak).delete(authorize, streakController.deleteStreak);
router.route('/:id/count').put(authorize, streakController.updateStreakCount);

module.exports = router;