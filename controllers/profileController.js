import {profile} from "../modules/ProfileSchema.js";

export const createProfile = async (req, res, next) => {
  try {
    const { name, email, subject } = req.body;

    if (!name || !email || !subject) {
      return next({ message: "Please Fill Full Form!", statusCode: 400 });
    }

    const profile= await profile.create(req.body);

    res.status(201).json({
      success: true,
      message: "Profile is Created Successfully!",
      teacher
    });

  } catch (err) {
    next(err);
  }
};

// GET ALL (already have)
export const getAllProfile = async (req, res, next) => {
  try {
    const profiles = await profile.find();
    res.status(200).json({ success: true, profiles });
  } catch (err) {
    next(err);
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res, next) => {
  try {
    const updatedProfile = await profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return next({ message: "Profile Not Found!", statusCode: 404 });
    }

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully!",
      teacher: updatedProfile
    });

  } catch (err) {
    next(err);
  }
};