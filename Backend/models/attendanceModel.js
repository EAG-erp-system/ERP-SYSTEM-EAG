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
            e.basic_salary,
            e.transport_allowance,
            e.mobil_card_allowance,
            a.date,
            a.status
        FROM employees e
        LEFT JOIN attendance a ON e.id = a.employee_id AND a.date = ?
        ORDER BY e.full_name ASC`,
        [date]
    );
    return rows;
};

exports.getEmployeeAttendanceStats = async (employee_id, year, month) => {
    const [rows] = await db.query(
        `SELECT 
            employee_id,
            COUNT(CASE WHEN status = 'PRESENT' THEN 1 END) AS present_count,
            COUNT(CASE WHEN status = 'ABSENT' THEN 1 END) AS absent_count,
            COUNT(CASE WHEN status = 'LATE' THEN 1 END) AS late_count,
            COUNT(CASE WHEN status = 'LEAVE_AUTHORIZED' THEN 1 END) AS authorized_leave_count,
            COUNT(CASE WHEN status = 'UNPAID_LEAVE' THEN 1 END) AS unpaid_leave_count,
            COUNT(*) AS total_marked_days
        FROM attendance
        WHERE employee_id = ?  
            AND YEAR(date) = ? 
            AND MONTH(date) = ?
        GROUP BY employee_id`,
        [employee_id, year, month]
    );

    if (rows.length === 0) {
        return {
            employee_id: Number(employee_id),
            present_count: 0,
            absent_count: 0,
            late_count: 0,
            authorized_leave_count: 0,
            unpaid_leave_count: 0,
            total_marked_days: 0
        };
    }

    return rows[0];
};

exports.getAllEmployeesMonthlyStats = async (year, month) => {
    const [rows] = await db.query(
        `SELECT 
            e.id AS employee_id,
            e.full_name,
            e.department,
            e.basic_salary,
            e.transport_allowance,
            e.mobil_card_allowance,
            COALESCE(COUNT(CASE WHEN a.status = 'PRESENT' THEN 1 END), 0) AS present_count,
            COALESCE(COUNT(CASE WHEN a.status = 'ABSENT' THEN 1 END), 0) AS absent_count,
            COALESCE(COUNT(CASE WHEN a.status = 'LATE' THEN 1 END), 0) AS late_count,
            COALESCE(COUNT(CASE WHEN a.status = 'LEAVE_AUTHORIZED' THEN 1 END), 0) AS authorized_leave_count,
            COALESCE(COUNT(CASE WHEN a.status = 'UNPAID_LEAVE' THEN 1 END), 0) AS unpaid_leave_count,
            COALESCE(COUNT(a.id), 0) AS total_marked_days
        FROM employees e
        LEFT JOIN attendance a 
            ON e.id = a.employee_id 
            AND YEAR(a.date) = ? 
            AND MONTH(a.date) = ?
        GROUP BY e.id, e.full_name, e.department, e.basic_salary, e.transport_allowance, e.mobil_card_allowance
        ORDER BY e.full_name ASC`,
        [year, month]
    );

    return rows;
};