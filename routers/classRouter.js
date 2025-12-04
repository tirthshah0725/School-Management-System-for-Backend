import express from "express";
import { getAllClasses,createClass } from "../controllers/classController.js";

const router = express.Router();

router.post('/', createClass);
router.get('/getall', getAllClasses);


export default router;


