import express from "express";
import { getAllBooks,createBook,pickBook,returnBook } from "../controllers/libraryController.js";

const router = express.Router();

router.post("/create", createBook);
router.get("/getall", getAllBooks);
router.post("/pick", pickBook);
router.post("/return", returnBook);


export default router;


