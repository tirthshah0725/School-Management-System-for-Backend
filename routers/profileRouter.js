import express from "express"
import { getAllProfile,createProfile,updateProfile  } from "../controllers/profileController.js"

const router = express.Router();

router.get('/getall',getAllProfile);
router.post('/create',createProfile);
router.put('/update/:id',updateProfile);

export  default router;