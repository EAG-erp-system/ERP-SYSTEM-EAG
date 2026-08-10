const db = require('../config/db');

exports.markAttendance = async (attendanceData) => {
    const { employee_id, date, status } = attendanceData;

    const [result] = await db.query(
        `
            INSERT INTO attendance (employee_id, date, status)
            VALUES (?,?,?)
            ON DUPLICATE KEY UPDATE status = VALUES(status)
        `,
        [employee_id, date, status]
    );

    return result;
}

exports.getEmployeeAttendance = async (employee_id, startDate, endDate) => {
    let query = `SELECT * FROM attendance WHERE employee_id = ?`;
    const params = [employee_id];

    if(startDate && endDate) {
        query += ` AND date BETWEEN ? AND ?`;
        params.push(startDate, endDate)
    }

    query += ` ORDER BY date DESC`;

    const [rows] = await db.query(query, params);
    return rows;
}

exports.getDailyAttendanceSummary = async (date) => {
    const [rows] = await db.query(
        `SELECT 
            a.id,
            e.id AS employee_id,
            e.full_name,
            e.department,
            a.date,
            a.status
         FROM employees e
         LEFT JOIN attendance a ON e.id = a.employee_id AND a.date = ?
         ORDER BY e.full_name ASC`,
        [date]
    );
    return rows;
};