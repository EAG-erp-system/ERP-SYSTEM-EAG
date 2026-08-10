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