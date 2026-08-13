const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } =require('../middleware/roleMiddleware');

router.use(protect);

router.get('/my-attendance', attendanceController.getMyAttendance);

router.post('/mark', authorize('ADMIN', 'HR'), attendanceController.markAttendance);
router.get('/daily-report', authorize('ADMIN', 'HR'), attendanceController.getDailyReport);

router.get('/my-stats', attendanceController.getMyAttendanceStats);

router.get('/monthly-summary', authorize('ADMIN', 'HR'), attendanceController.getAllMonthlyStats);

module.exports = router;