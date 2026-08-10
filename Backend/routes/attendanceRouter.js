const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } =require('../middleware/roleMiddleware');

router.use(protect);

router.get('/my-attendance', attendanceController.getMyAttendance);

router.post('/mark', attendanceController.markAttendance);
router.get('/daily-report', attendanceController.getDailyReport);

module.exports = router;