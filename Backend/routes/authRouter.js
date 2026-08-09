const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { authorize } =require('../middleware/roleMiddleware');
const employeeController = require('../controllers/authController');

router.post('/register', protect, authorize('ADMIN'), employeeController.registerEmployee);
router.post('/login', employeeController.login);

router.get('/me', protect, employeeController.getMe);
router.put('updateMe', protect, employeeController.updateProfile);
router.put('/employees/:id', protect, employeeController.updateEmployeeByAdmin);

module.exports = router;