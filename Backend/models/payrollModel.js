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

exports.updateBatchTotals = async (batchId) => {
    await db.query(
        `UPDATE payroll_batches 
         SET total_gross = (SELECT SUM(gross_salary) FROM payrolls WHERE payroll_batch_id = ?),
            total_net = (SELECT SUM(net_salary) FROM payrolls WHERE payroll_batch_id = ?)
         WHERE id = ?`,
        [batchId, batchId, batchId]
    );
};

exports.getBatches = async () => {
    const [batches] = await db.query(
        `SELECT pb.*, (
            SELECT COUNT(*) FROM payrolls p WHERE p.payroll_batch_id = pb.id
         ) AS employee_count
         FROM payroll_batches pb
         ORDER BY pb.year DESC, pb.month DESC, pb.id DESC`
    );
    return batches;
};

exports.getBatchDetails = async (batchId) => {
    const [batch] = await db.query(`SELECT * FROM payroll_batches WHERE id = ?`, [batchId]);
    if (!batch.length) return null;

    const [payrolls] = await db.query(
        `SELECT p.*, e.full_name, e.department, e.bank_name, e.account_number 
         FROM payrolls p 
         JOIN employees e ON p.employee_id = e.id 
         WHERE p.payroll_batch_id = ?`,
        [batchId]
    );

    const [totals] = await db.query(
        `SELECT 
            SUM(basic_salary) AS total_basic_salary,
            SUM(transport_allowance) AS total_transport_allowance,
            SUM(mobil_card_allowance) AS total_mobil_card_allowance,
            SUM(unpaid_days_deduction) AS total_unpaid_deductions,
            SUM(gross_salary) AS total_gross_salary,
            SUM(taxable_income) AS total_taxable_income,
            SUM(income_tax) AS total_income_tax,
            SUM(employee_pension_staff) AS total_employee_pension,
            SUM(employer_pension) AS total_employer_pension,
            SUM(total_deductions) AS total_deductions,
            SUM(net_salary) AS total_net_salary
         FROM payrolls
         WHERE payroll_batch_id = ?`,
        [batchId]
    );

    return { ...batch[0], grand_totals: totals[0], employees: payrolls };
};

exports.approveBatch = async (batchId, approvedBy) => {
    const [result] = await db.query(
        `UPDATE payroll_batches 
         SET status = 'APPROVED', approved_by = ? 
         WHERE id = ? AND status = 'DRAFT'`,
        [approvedBy, batchId]
    );
    return result.affectedRows > 0;
};

exports.markBatchAsPaid = async (batchId) => {
    const [batchResult] = await db.query(
        `UPDATE payroll_batches 
         SET status = 'PAID' 
         WHERE id = ? AND status = 'APPROVED'`,
        [batchId]
    );

    if (batchResult.affectedRows === 0) return false;

    await db.query(
        `UPDATE payrolls 
         SET payment_status = 'PAID', payment_date = CURDATE() 
         WHERE payroll_batch_id = ?`,
        [batchId]
    );

    return true;
};
