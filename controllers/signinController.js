import { User } from "../modules/signinSchema.js";
import {handleValidationError} from "../middlewares/errorHandler.js"


export const createUser = async(req,res,next) => {
    console.log(req.body);
    const {name,email,password,usertype,mobile,age} = req.body; 
    try{
        if(!name || !email || !password || !usertype || !mobile)
        {
            handleValidationError ("Please Fill Full From",400);
        }
        await User.create({name,email,password,usertype,mobile,age});
        res.status(200).json({
            success:true,   
            message:"User Created!",
        })
    }           
    catch(err){
        next(err)
    }   
};

export const getAllUsers = async (req,res,next) => {           
    try
    {
        const users = await User.find();    
        res.status(200).json({
            success : true,
            users,
        })
    }   
    catch(err)
    {
        next(err)
    }   
}   

export const loginUser = async (req, res, next) => {
  try {
    const { email, password, usertype } = req.body;
    console.log("Data get",email,password,usertype);
    if (!email || !password || !usertype) {
      return next(handleValidationError("All fields required", 400));
    }

    const user = await User.findOne({ email:email,password:password,usertype:usertype });

    if (!user) {
        // res.json({ success: false,
        // message: "User not Found",})
        // return next(handleValidationError("Invalid Email", 400));
        res.cookie('studentId', user._id, { 
        httpOnly: true, 
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        // secure: true, // Use this in production with HTTPS
        // sameSite: 'Strict', // Recommended for security
    });
    }
    console.log("User found",user);
    res.status(200).json({
      success: true,
      message: "Login Successful",
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const forgotpassword = async (req,res,next) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user){
            return next(handleValidationError("User Not Found",400));
        }
        if(user){
            await User.findOneAndUpdate({email:email},{$set:{password: password}})
            res.status(200).json({  
            success:true,
            message:"Password Updated Successfully",
        })
    }
        
    }
    catch(err){
        next(err)
    }
}

export const getprofile = async (req,res,next) => {
    const student = await User.findById(req.params.id);
    res.json({ success: true, profile: student });
};

export const updateprofile = async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({ success: true, updated });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};