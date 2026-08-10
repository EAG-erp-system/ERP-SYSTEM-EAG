const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { authorize } =require('../middleware/roleMiddleware');
const employeeController = require('../controllers/authController');

router.use(protect);

router.post('/register', employeeController.registerEmployee);
router.post('/login', employeeController.login);

router.get('/me', employeeController.getMe);
router.put('updateMe', employeeController.updateProfile);
router.put('/employees/:id', employeeController.updateEmployeeByAdmin);

module.exports = router;