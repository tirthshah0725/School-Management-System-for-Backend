import express from "express"
import {createUser,getAllUsers,loginUser,forgotpassword,getprofile,updateprofile} from "../controllers/signinController.js";

const router = express.Router();

router.get('/getall',getAllUsers);
router.post('/create',createUser);
router.post('/forgotpassword',forgotpassword);
router.post('/login',loginUser);
router.get('/profile/:id', getprofile);
router.put('/update/:id', updateprofile);


export  default router;

