const db = require('../config/db');
const bcrypt = require('bcrypt');


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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [ 
            full_name, 
            email, 
            password, 
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
}

exports.getMe = async (userId) => {
    const [result] = await db.query(
        `
            SELECT 
                id,
                full_name,
                email,
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
    return result[0]
}