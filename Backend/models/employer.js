const db = require('../config/db');
const bcrypt = require('bcryptjs');


exports.createEmployee = async (userData) => {
    const { 
        full_name, 
        email, 
        password, 
        role = 'EMPLOYEE',
        basic_salary = 0.00, 
        transport_allowance = 0.00, 
        mobil_card_allowance = 0.00, 
        bank_name, 
        account_number, 
        hire_date 
    } = userData;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await db.query(
        `INSERT INTO employees (
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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [ 
            full_name, 
            email, 
            hashedPassword, 
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