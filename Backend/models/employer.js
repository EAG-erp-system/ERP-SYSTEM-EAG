const db = require('../config/db');

exports.createEmployee = async (userData) => {
    const { 
        full_name, 
        email, 
        password, 
        department,
        role = 'EMPLOYEE',
        basic_salary = 0.00, 
        transport_allowance = 0.00, 
        mobil_card_allowance = 0.00, 
        bank_name, 
        account_number, 
        hire_date 
    } = userData;

    const [result] = await db.query(
        `INSERT INTO employees (
            full_name, 
            email, 
            password, 
            department,
            role, 
            basic_salary, 
            transport_allowance, 
            mobil_card_allowance, 
            bank_name, 
            account_number, 
            hire_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [ 
            full_name, 
            email, 
            password, 
            department,
            role, 
            basic_salary, 
            transport_allowance, 
            mobil_card_allowance, 
            bank_name, 
            account_number, 
            hire_date 
        ]
    );

    return result.insertId;
};

exports.findEmployeeByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM employees WHERE email = ?",
        [email]
    );
    return rows[0];
};

exports.getMe = async (userId) => {
    const [result] = await db.query(
        `
            SELECT 
                id,
                full_name,
                email,
                department,
                role, 
                basic_salary, 
                transport_allowance, 
                mobil_card_allowance, 
                bank_name, 
                account_number, 
                hire_date
            FROM employees
            WHERE id = ?
        `,
        [userId]
    );
    return result[0];
};

exports.updateEmployee = async (userId, userData) => {
    const fields = [];
    const values = [];

    Object.keys(userData).forEach((key) => {
        if(userData[key] !== undefined) {
            fields.push(`${key} = ?`);
            values.push(userData[key]);
        }
    });

    if (fields.length === 0) return null;

    values.push(userId)

    const sql = `UPDATE employees SET ${fields.join(', ')} WHERE id = ?`;
    await db.query(sql, values);

    const [rows] = await db.query(
        `
            SELECT id, full_name, email, department, role, basic_salary, 
                transport_allowance, mobil_card_allowance, bank_name, 
                account_number, hire_date 
            FROM employees WHERE id = ?
        `,
        [userId]
    );
    return rows[0];
}