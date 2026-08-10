const attendanceModel = require('../models/attendanceModel');

exports.markAttendance = async (req, res, next) => {
    try {
        const { employee_id, date, status } = req.body;

        if (!employee_id || !date || !status) {
            res.status(400);
            throw new Error('Please provide employee_id, date, and status');
        }

        await attendanceModel.markAttendance({ employee_id, date, status });

        res.status(200).json({
            success: true,
            message: 'Attendance recorded successfully'
        });
    } catch (error) {
        next(error);
    }
};

exports.getMyAttendance = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const records = await attendanceModel.getEmployeeAttendance(req.user.id, startDate, endDate);

        res.status(200).json({
            success: true,
            data: records
        });
    } catch (error) {
        next(error);
    }
};

exports.getDailyReport = async (req, res, next) => {
    try {
        const date = req.query.date || new Date().toISOString().split('T')[0];
        const report = await attendanceModel.getDailyAttendanceSummary(date);

        res.status(200).json({
            success: true,
            date,
            data: report
        });
    } catch (error) {
        next(error);
    }
};

exports.getMyAttendanceStats = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const now = new Date();
        const year = req.query.year || now.getFullYear();
        const month = req.query.month || (now.getMonth() + 1);

        const stats = await attendanceModel.getEmployeeAttendanceStats(userId, year, month);

        res.status(200).json({
            success: true,
            year: Number(year),
            month: Number(month),
            data: stats
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllMonthlyStats = async (req, res, next) => {
    try {
        const now = new Date();
        const year = req.query.year || now.getFullYear();
        const month = req.query.month || (now.getMonth() + 1);

        const stats = await attendanceModel.getAllEmployeesMonthlyStats(year, month);

        res.status(200).json({
            success: true,
            year: Number(year),
            month: Number(month),
            data: stats
        });
    } catch (error) {
        next(error);
    }
};