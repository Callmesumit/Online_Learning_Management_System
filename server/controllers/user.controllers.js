import User from "../models/user.models.js"; // Corrected import
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User  already exists with this email"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            name,
            email,
            password:hashedPassword,
            role
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to register"
        });
    }
};

export const login = async (req, res) => {
    try {
        const {email , password} = req.body
        if (!email || !password) {
            return res.status(400).json({
                success:false,
                message:"All Field are Rquired"
            })
        }
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            })
        }
         const isPasswordMatch = await bcrypt.compare(password, user.password)
         if (!isPasswordMatch) {
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            })
         }
        //  genrate token
        const token = jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn: "1d"})
        return res.cookie('token', {httpOnly:true, sameSite:'strict', maxAge:1*24*60*60*1000}).json({
            message:`WElcome Back ${user.name}`,
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to Login"
        });
    }
}

export const logout = async(__, res)=>{
    try {
        return res.status(200).cookie("token" , " " ,{maxAge:0}).json({
            message:"LogOut Are Successfully",
            success:"true"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to Logout"
        });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Email and new password are required."
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to reset password."
        });
    }
};
