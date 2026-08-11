const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salaryHistoryController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);

router.post('/change', salaryController.changeSalary);

router.get('/employee/:employeeId', salaryController.getEmployeeSalaryHistory);

module.exports = router;