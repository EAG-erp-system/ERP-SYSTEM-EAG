const employee = require('../models/employer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    return jwt.sign(
        { id, role },
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

        if ( !full_name || !email || !password || !department || !bank_name || !account_number || !hire_date) {
            res.status(400);
            throw new Error("Please provide all required fields");
        }

        const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (!strongPassword.test(password)) {
            res.status(400);
            throw new Error(
                "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            );
        }

        const existingEmployee = await employee.findEmployeeByEmail(email);

        if (existingEmployee) {
            res.status(400);
            throw new Error("Email already registered");
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

        const token = generateToken(
            employeeId,
            role || "EMPLOYEE"
        );

        res.status(201).json({
            success: true,
            message: "Employee successfully registered",
            token,
            employee: {
                id: employeeId,
                full_name,
                email,
                department,
                role: role || "EMPLOYEE"
            }
        });

    } catch (error) {
        next(error);
    }
};

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

        const token = generateToken(user.id, user.role);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
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

exports.updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { full_name, email, bank_name, account_number } = req.body;

        const updateData = {}
        if (full_name) updateData.full_name = full_name;
        if (bank_name) updateData.bank_name = bank_name;
        if (account_number) updateData.account_number = account_number;

        if(email) {
            const existingEmployee = await employee.findEmployeeByEmail(email);
            if(existingEmployee && existingEmployee.id !== userId) {
                res.status(400);
                throw new Error("Email is already in use by another account");
            }
            updateData.email = email;
        }

        const updatedEmployee = await employee.updateEmployee(userId, updateData);

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            employee: updatedEmployee
        })
    } catch (error) {
        next(error);
    }
}

exports.updateEmployeeByAdmin = async (req, res, next) => {
    try {
        const targetEmployeeId = req.params.id;
        const updateData = { ...req.body };

        delete updateData.id;

        if (updateData.email) {
            const existingEmployee = await employee.findEmployeeByEmail(updateData.email);
            if (existingEmployee && Number(existingEmployee.id) !== Number(targetEmployeeId)) {
                res.status(400);
                throw new Error("Email is already in use by another account");
            }
        }

        if(updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        const updatedEmployee = await employee.updateEmployee(targetEmployeeId, updateData);

        res.status(200).json({
            success: true,
            message: "Employee updated successfully by Admin",
            employee: updatedEmployee
        })
    } catch (error) {
        next(error)
    }
}
