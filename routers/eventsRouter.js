import express from "express"
import { getAllEvents,createEvents } from "../controllers/enventsController.js"; 

const router = express.Router();

router.get('/getall',getAllEvents);
router.post('/create',createEvents);

export default router;