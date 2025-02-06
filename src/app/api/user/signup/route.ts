import connect from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from '@/models/user.model.js';
import bcrypt from 'bcryptjs'
import { sendEmail } from "@/helpers/sendEmail";

connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log(reqBody)
        const {username,email,password} = reqBody;
        if (!username|| !email || !password){
            return NextResponse.json({error:"All fields must be required!"},{status:400})
        }
        const user = await User.findOne({email})
        if (user){
            return NextResponse.json({error :"User Already Exists"},{status:400})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        const savedUser = new User({
            username,email,password: hashedPassword
        });
        await savedUser.save()
        console.log(savedUser)
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
        return NextResponse.json({
            message:"User created successfully",
            savedUser,
            success:true
        })
    } catch (error:any) {
        console.error("Error in signup post route",error.message);
        return NextResponse.json({error:"error in signup route"},{status:500})
    }
    
}