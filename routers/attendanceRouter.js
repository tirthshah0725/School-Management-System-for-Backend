// routes/attendanceRouter.js
import express from "express";
import { markAttendance, getAllAttendance,getAttendanceByName } from "../controllers/attendanceController.js";

const router = express.Router();

router.get('/student/:studentId', getAllAttendance);
router.post('/create', markAttendance);
router.get('/student/name/:studentName', getAttendanceByName);

export default router;