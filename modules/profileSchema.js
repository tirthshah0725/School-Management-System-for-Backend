import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
    phone: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  qualification: {
    type: String,
    default: ""
  }
}, { timestamps: true });

export const profile = mongoose.model("profile", profileSchema);
