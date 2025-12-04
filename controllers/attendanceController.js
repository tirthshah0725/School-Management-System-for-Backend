// controllers/attendanceController.js
import { Attendance } from "../modules/attendanceSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";


export const markAttendance = async (req, res, next) => {
   
const { date, attendanceData } = req.body; 

    try {
        if (!date || !attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
            handleValidationError("Date and valid attendance data are required!", 400); 
        }

        const attendanceDate = new Date(date);
        const bulkOps = [];

        for (const record of attendanceData) {
            // Updated to pull temporary ID, status, AND name
            const { student, status, name } = record; 

            bulkOps.push({
                updateOne: {
                    filter: { 
                        student: student, // Filters by the temporary UUID string
                        date: attendanceDate 
                    },
                    update: { 
                        $set: { 
                            student: student,
                            studentName: name, // Save the student name
                            status: status,
                            date: attendanceDate
                        } 
                    },
                    upsert: true, 
                }
            });
        }

        const result = await Attendance.bulkWrite(bulkOps);

        res.status(200).json({
            success: true,
            message: "Attendance marked and saved successfully!",
            details: {
                totalRecordsProcessed: result.upsertedCount + result.modifiedCount,
            }
        });

    } catch (err) {
        if (err.code === 11000) {
             return res.status(409).json({ success: false, message: "Duplicate attendance attempt for one or more students on this date." });
        }
        console.error("Mongoose Error:", err);
        next(err);
    }
};



export const getAllAttendance = async (req, res, next) => {
    try {
        const studentId = req.params.studentId;

        // Fetch all attendance records matching the student ID string
        const attendance = await Attendance.find({ student: studentId })
            .sort({ date: -1 }); // Sort newest dates first

        res.status(200).json({
            success: true,
            attendance,
        });
    } catch (err) {
        console.error("Error fetching student attendance:", err);
        next(err);
    }
};


// Add a new function for searching by name
export const getAttendanceByName = async (req, res, next) => {
    try {
        // We get the student's name from the URL parameters
        const studentName = req.params.studentName;

        if (!studentName) {
            return res.status(400).json({
                success: false,
                message: "Student name parameter is required."
            });
        }

        // Fetch all attendance records where the studentName field matches
        const attendance = await Attendance.find({ studentName: studentName })
            .sort({ date: -1 }); // Sort newest dates first

        res.status(200).json({
            success: true,
            attendance,
        });
    } catch (err) {
        console.error("Error fetching student attendance by name:", err);
        next(err);
    }
};

// NOTE: Keep your existing functions, but add this new one for the route below.