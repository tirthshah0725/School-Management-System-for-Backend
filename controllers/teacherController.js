import { Teacher } from "../modules/teacherSchema.js";

export const createTeacher = async (req, res, next) => {
  const { name, email, subject, class: className } = req.body;
  
  try {
    if (!name || !email || !subject || !className) {
      return res.status(400).json({
        success: false,
        message: "Please Fill Full Form!"
      });
    }

    await Teacher.create({ name, email, subject, class: className });

    res.status(201).json({
      success: true,
      message: "Teacher Created!",
    });

  } catch (err) {
    next(err);
  }
};

export const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({
      success: true,
      teachers,
    });
  } catch (err) {
    next(err);
  }
};
