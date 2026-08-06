const employee = require('../models/employer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
};

exports.registerEmployee = async (req, res, next) => {
    try {
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
    } = req.body;

    if (!full_name || !email || !password || !bank_name || !account_number || !hire_date) {
        res.status(400);
        throw new Error("Require all data")
    }

    const existingEmployee = await employee.findEmployeeByEmail(email);
    if (existingEmployee) {
        res.status(400);
        throw new Error("Email already registered")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const employeeId = await employee.createEmployee({
        full_name,
        email,
        password: hashedPassword,
        role,
        basic_salary,
        transport_allowance,
        mobil_card_allowance,
        bank_name,
        account_number,
        hire_date
    });

    const token = generateToken(employeeId);

    res.status(201).json({
        success: true,
        message: "Employee successfully registered",
        token,
        employee: {
            id: employeeId,
            full_name,
            email,
            role
        }
    })
    } catch (error) {
        next(error)
    }
}