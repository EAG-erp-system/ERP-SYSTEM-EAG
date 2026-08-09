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
        department,
        role,
        basic_salary,
        transport_allowance,
        mobil_card_allowance,
        bank_name, 
        account_number, 
        hire_date 
    } = req.body;

    if (!full_name || !email || !password || !department, !bank_name || !account_number || !hire_date) {
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
        department,
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
            department,
            role
        }
    })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            res.status(400)
            throw new Error("Required all data")
        };

        const user = await employee.findEmployeeByEmail(email);
        if(!user) {
            res.status(401);
            throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            res.status(401);
            throw new Error("Invalid email or password");
        }

        const token = generateToken(user.id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email
            }
        })
    } catch (error) {
        next(error)
    }
}
exports.getMe = async (req, res, next) => {
    try {
        const user = await employee.getMe(req.user.id);

        if(!user) {
            res.status(404)
            throw new Error("User not found")
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error)
    }
}

exports.update = async (req, res, next) => {
    try {
        const {
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
        } = req.body;

        const userId = req.user.id;

        if(!userId) {
            res.status(400)
            throw new Error("User Not found")
        }

        const existingUser = await employee.findEmployeeByEmail(email);
        if(existingUser && existingUser.id !== userId) {
            res.status(400)
            throw new Error("Email is already in use by another account");
        }

        const updateEmployee = await employee.updateEmployee(userId);

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        })
    } catch(error) {
        next(error)
    }
}