import express from "express";
import {config} from 'dotenv';
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";

import teacherRouter from "./routers/teacherRouter.js"
import studentRouter from "./routers/studentRouter.js"

import examRouter from "./routers/examRouter.js"
import announcementRouter from "./routers/announcementRouter.js"
import attendanceRouter from "./routers/attendanceRouter.js"
import classRouter from "./routers/classRouter.js"
import assignmentRouter from "./routers/assignmentRouter.js"
import eventsRouter from "./routers/eventsRouter.js"
import libraryRouter from "./routers/libraryRouter.js"
import profileRouter from "./routers/profileRouter.js"
import signinRouter from "./routers/signinRouter.js"

import { errorHandler } from "./middlewares/errorHandler.js";

import { Announcement } from "./modules/announcementSchema.js";
import { Assignment } from "./modules/assignmentSchema.js";
import { Attendance } from "./modules/attendanceSchema.js";
import { Class } from "./modules/classSchema.js";
import { Exam } from "./modules/examSchema.js";
import { Events } from "./modules/eventsSchema.js";
import { Book } from "./modules/librarySchema.js";
import { Student } from "./modules/studentSchema.js";
import { Teacher } from "./modules/teacherSchema.js";
import { profile } from "./modules/profileSchema.js";
import { User } from "./modules/signinSchema.js";

const app = express();
config({path: "./config/config.env"});

app.use( 
    cors(
        // origin: [process.env.FRONTEND_URL],
        // methods: "GET, POST, PUT,DELETE", 
        // credentials: true,
    ) 
);

app.use((err,req,res,next) => {
    errorHandler(err,req,res,next); 
})

app.use(express.json());

// app.options("*", cors());


app.use(express.urlencoded({extended: true}));

app.use("/api/v1/students",studentRouter)   
app.use("/api/v1/teachers", teacherRouter);

app.use("/api/v1/assignments", assignmentRouter); 
app.use("/api/v1/events",eventsRouter)    
app.use("/api/v1/library", libraryRouter)  
app.use("/api/v1/announcements", announcementRouter);
app.use("/api/v1/class", classRouter);  
app.use("/api/v1/exam", examRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/profile",profileRouter);
app.use("/api/v1/admin/signin",signinRouter);

dbConnection();

app.listen(process.env.PORT, () => {
    console.log( `Server listening on port ${process.env.PORT} `);
});

export default app;