const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.get('/slots', meetingController.getSlots);
router.get('/meetings', meetingController.getMeetings);
router.post('/meetings', meetingController.bookMeeting);
router.delete('/meetings/:id', meetingController.cancelMeeting);

module.exports = router;
