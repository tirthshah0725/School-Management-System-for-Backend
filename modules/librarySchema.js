import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
  bookname: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    unique: true
  },
  pickedBy: {
    type: String,   // store studentId
    default: null
  },
});


export const Book = mongoose.model('Library', librarySchema);



