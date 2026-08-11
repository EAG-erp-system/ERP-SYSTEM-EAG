const salaryHistoryModel = require('../models/salaryHistoryModel');

exports.changeSalary = async (req, res, next) => {
    try {
        const { employee_id, new_salary, change_reason, effective_date } = req.body;
        const changedBy = req.user.id;

        if (!employee_id || !new_salary || !effective_date) {
            res.status(400);
            throw new Error('Please provide employee_id, new_salary, and effective_date.');
        }

        const result = await salaryHistoryModel.updateEmployeeSalary({
            employeeId: employee_id,
            newSalary: new_salary,
            changeReason: change_reason,
            changedBy,
            effectiveDate: effective_date
        });

        res.status(200).json({
            success: true,
            message: 'Salary updated successfully and recorded in history.',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

exports.getEmployeeSalaryHistory = async (req, res, next) => {
    try {
        const { employeeId } = req.params;
        const history = await salaryHistoryModel.getSalaryHistoryByEmployee(employeeId);

        res.status(200).json({
            success: true,
            data: history
        });
    } catch (error) {
        next(error);
    }
};