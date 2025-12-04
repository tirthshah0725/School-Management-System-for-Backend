import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
student: { 
        type: String, 
        required: true
    },
    // NEW FIELD: To save the student's name alongside the temporary ID
    studentName: {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        required: true,
        set: (v) => new Date(new Date(v).setUTCHours(0, 0, 0, 0)),
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Absent with apology'],
        required: true
    }
}, { timestamps: true });

// CRITICAL UPDATE: Ensures only ONE record per student per day.
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

export const Attendance = mongoose.model('Attendance', attendanceSchema);