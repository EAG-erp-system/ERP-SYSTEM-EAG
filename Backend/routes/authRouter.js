const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { authorize } =require('../middleware/roleMiddleware');
const employeeController = require('../controllers/authController');

// router.use(protect);

router.post('/register', protect, authorize('ADMIN', 'HR'), employeeController.registerEmployee);
router.post('/login', employeeController.login);

router.get('/me', protect, employeeController.getMe);
router.put('updateMe', protect, employeeController.updateProfile);
router.put('/employees/:id', protect, authorize('ADMIN', 'HR'), employeeController.updateEmployeeByAdmin);

module.exports = router;