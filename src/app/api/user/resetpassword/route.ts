import User from "@/models/user.model";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import connect from '@/dbConfig/dbConfig'

connect();
export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {newPassword,resetToken}=reqBody;
        const user = await User.findOne({
            forgotPasswordToken: resetToken,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });
        if (!user){
            return NextResponse.json({messsage:"Invalid Token"},{status:400})
        }  
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(newPassword,salt)
        await User.findByIdAndUpdate(user._id,{password:hashedPassword})
        return NextResponse.json({message:"Reset Successfull"},{status:200}) 
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({error:error.message},{status:500})
    }
}