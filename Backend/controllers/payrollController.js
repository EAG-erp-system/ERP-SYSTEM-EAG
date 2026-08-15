const db = require('../config/db');
const payrollModel = require('../models/payrollModel');
const { calculateIncomeTax, calculateTaxableIncome } = require('../utils/payrollCalculator');

exports.generatePayroll = async (req, res, next) => {
    try {
        const month = Number(req.body.month);
        const year = Number(req.body.year);
        const processedBy = req.user.id;

        if (!Number.isInteger(month) || month < 1 || month > 12 || !Number.isInteger(year) || year < 2000 || year > 2100) {
            res.status(400);
            throw new Error('Please provide a valid payroll month (1–12) and year.');
        }

        const [existingBatch] = await db.query(
            `SELECT id FROM payroll_batches WHERE month = ? AND year = ?`,
            [month, year]
        );
        if (existingBatch.length > 0) {
            res.status(400);
            throw new Error(`Payroll batch for ${month}/${year} already exists.`);
        }

        const batchId = await payrollModel.createBatch(month, year, processedBy);

        const [employees] = await db.query(`SELECT * FROM employees`);

        for (const emp of employees) {
            const [attendance] = await db.query(
                `SELECT COUNT(*) AS unpaid_days FROM attendance 
                 WHERE employee_id = ? AND YEAR(date) = ? AND MONTH(date) = ? AND status = 'UNPAID_LEAVE'`,
                [emp.id, year, month]
            );

            const unpaidDays = attendance[0].unpaid_days || 0;
            const dailyRate = Number(emp.basic_salary) / 30;
            const unpaidDeduction = unpaidDays * dailyRate;

            const basicSalary = Number(emp.basic_salary);
            const transportAllowance = Number(emp.transport_allowance || 0);
            const mobileAllowance = Number(emp.mobil_card_allowance || 0);

            const grossSalary = basicSalary + transportAllowance + mobileAllowance - unpaidDeduction;

            const taxableIncome = calculateTaxableIncome(basicSalary, transportAllowance, mobileAllowance, unpaidDeduction);
            const incomeTax = calculateIncomeTax(taxableIncome);

            const employeePension = basicSalary * 0.07;
            const employerPension = basicSalary * 0.11;

            const totalDeductions = incomeTax + employeePension + unpaidDeduction;
            const netSalary = grossSalary - incomeTax - employeePension;

            await payrollModel.createPayrollRecord({
                payroll_batch_id: batchId,
                employee_id: emp.id,
                basic_salary: basicSalary,
                transport_allowance: transportAllowance,
                mobil_card_allowance: mobileAllowance,
                unpaid_days_count: unpaidDays,
                unpaid_days_deduction: unpaidDeduction.toFixed(2),
                gross_salary: grossSalary.toFixed(2),
                taxable_income: taxableIncome.toFixed(2),
                income_tax: incomeTax.toFixed(2),
                employee_pension_staff: employeePension.toFixed(2),
                employer_pension: employerPension.toFixed(2),
                total_deductions: totalDeductions.toFixed(2),
                net_salary: netSalary.toFixed(2)
            });
        }

        await payrollModel.updateBatchTotals(batchId);

        const fullBatchReport = await payrollModel.getBatchDetails(batchId);

        res.status(201).json({
            success: true,
            message: `Payroll batch generated successfully for ${month}/${year}`,
            data: fullBatchReport
        });
    } catch (error) {
        next(error);
    }
};

exports.getPayrollBatches = async (req, res, next) => {
    try {
        const batches = await payrollModel.getBatches();
        res.status(200).json({ success: true, data: batches });
    } catch (error) {
        next(error);
    }
};

exports.getPayrollBatch = async (req, res, next) => {
    try {
        const batch = await payrollModel.getBatchDetails(req.params.id);
        if (!batch) {
            res.status(404);
            throw new Error('Payroll batch not found.');
        }
        res.status(200).json({ success: true, data: batch });
    } catch (error) {
        next(error);
    }
};

exports.getMyPayslip = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const now = new Date();
        const month = Number(req.query.month || now.getMonth() + 1);
        const year = Number(req.query.year || now.getFullYear());

        if (!Number.isInteger(month) || month < 1 || month > 12 || !Number.isInteger(year) || year < 2000 || year > 2100) {
            res.status(400);
            throw new Error('Please choose a valid payroll month and year.');
        }

        const [payslip] = await db.query(
            `SELECT p.*, pb.month, pb.year, pb.status AS batch_status
             FROM payrolls p
             JOIN payroll_batches pb ON p.payroll_batch_id = pb.id
             WHERE p.employee_id = ? AND pb.month = ? AND pb.year = ?`,
            [userId, month, year]
        );

        if (!payslip.length) {
            // A payroll run may legitimately not exist yet.  Returning an empty
            // result keeps the employee dashboard quiet instead of logging a server error.
            return res.status(200).json({ success: true, data: null, message: 'No payslip has been generated for this period yet.' });
        }

        res.status(200).json({
            success: true,
            data: payslip[0]
        });
    } catch (error) {
        next(error);
    }
};

exports.approvePayrollBatch = async (req, res, next) => {
    try {
        const { id } = req.params;
        const approvedBy = req.user.id;

        const approved = await payrollModel.approveBatch(id, approvedBy);

        if (!approved) {
            res.status(400);
            throw new Error('Batch cannot be approved. It might already be approved or does not exist.');
        }

        const updatedBatch = await payrollModel.getBatchDetails(id);

        res.status(200).json({
            success: true,
            message: `Payroll batch #${id} has been successfully APPROVED.`,
            data: updatedBatch
        });
    } catch (error) {
        next(error);
    }
};

exports.payPayrollBatch = async (req, res, next) => {
    try {
        const { id } = req.params;

        const paid = await payrollModel.markBatchAsPaid(id);

        if (!paid) {
            res.status(400);
            throw new Error('Batch payment cannot be processed. Ensure the batch status is APPROVED first.');
        }

        const paidBatch = await payrollModel.getBatchDetails(id);

        res.status(200).json({
            success: true,
            message: `Payroll batch #${id} marked as PAID. Employee payslips updated.`,
            data: paidBatch
        });
    } catch (error) {
        next(error);
    }
};
