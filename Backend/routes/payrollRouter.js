const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);

router.post('/generate', authorize('ADMIN', 'HR'), payrollController.generatePayroll);

router.get('/my-payslip', authorize('ADMIN', 'HR'), payrollController.getMyPayslip);

// router.get('/my-payslip', payrollController.getMyPayslip);

router.patch('/batch/:id/approve', authorize('ADMIN', 'HR'), payrollController.approvePayrollBatch);

router.patch('/batch/:id/pay', authorize('ADMIN', 'HR'), payrollController.payPayrollBatch);

module.exports = router;