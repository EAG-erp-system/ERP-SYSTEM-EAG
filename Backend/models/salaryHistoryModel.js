const db = require('../config/db');

exports.updateEmployeeSalary = async ({ employeeId, newSalary, changeReason, changedBy, effectiveDate }) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [emp] = await connection.query(
            `SELECT basic_salary FROM employees WHERE id = ? FOR UPDATE`,
            [employeeId]
        );

        if (!emp.length) {
            throw new Error('Employee not found.');
        }

        const previousSalary = emp[0].basic_salary;

        await connection.query(
            `UPDATE employees SET basic_salary = ? WHERE id = ?`,
            [newSalary, employeeId]
        );

        await connection.query(
            `INSERT INTO salary_history (employee_id, previous_salary, new_salary, change_reason, changed_by, effective_date)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [employeeId, previousSalary, newSalary, changeReason || 'Annual Increment', changedBy, effectiveDate]
        );

        await connection.commit();
        return { previousSalary, newSalary };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

exports.getSalaryHistoryByEmployee = async (employeeId) => {
    const [rows] = await db.query(
        `SELECT sh.*, e.full_name AS changed_by_name
         FROM salary_history sh
         JOIN employees e ON sh.changed_by = e.id
         WHERE sh.employee_id = ?
         ORDER BY sh.effective_date DESC`,
        [employeeId]
    );
    return rows;
};