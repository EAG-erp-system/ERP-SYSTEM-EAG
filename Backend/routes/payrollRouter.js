const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);

router.post('/generate', payrollController.generatePayroll);

router.get('/my-payslip', payrollController.getMyPayslip);

router.patch('/batch/:id/approve', payrollController.approvePayrollBatch);

router.patch('/batch/:id/pay', payrollController.payPayrollBatch);

module.exports = router;