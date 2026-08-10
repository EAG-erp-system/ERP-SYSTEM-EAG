const db = require('../config/db');

exports.createBatch = async (month, year, processedBy) => {
    const [result] = await db.query(
        `INSERT INTO payroll_batches (month, year, processed_by) VALUES (?, ?, ?)`,
        [month, year, processedBy]
    );
    return result.insertId;
};

exports.createPayrollRecord = async (payrollData) => {
    const {
        payroll_batch_id,
        employee_id,
        basic_salary,
        transport_allowance,
        mobil_card_allowance,
        unpaid_days_count,
        unpaid_days_deduction,
        gross_salary,
        taxable_income,
        income_tax,
        employee_pension_staff,
        employer_pension,
        total_deductions,
        net_salary
    } = payrollData;

    const [result] = await db.query(
        `INSERT INTO payrolls (
            payroll_batch_id, employee_id, basic_salary, transport_allowance,
            mobil_card_allowance, unpaid_days_count, unpaid_days_deduction,
            gross_salary, taxable_income, income_tax, employee_pension_staff,
            employer_pension, total_deductions, net_salary
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            payroll_batch_id, employee_id, basic_salary, transport_allowance,
            mobil_card_allowance, unpaid_days_count, unpaid_days_deduction,
            gross_salary, taxable_income, income_tax, employee_pension_staff,
            employer_pension, total_deductions, net_salary
        ]
    );
    return result.insertId;
};