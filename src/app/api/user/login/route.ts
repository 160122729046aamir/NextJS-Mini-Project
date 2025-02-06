import connect from "@/dbConfig/dbConfig";
import User from "@/models/user.model.js";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        console.log(reqBody)
        const user = await User.findOne({email})
        if (!user){
            console.log('No User Found!')
            return NextResponse.json({message:"No User Exists"},{status:400})
        }
        const validPassword = await bcrypt.compare(password,user.password)
        if (!validPassword){
            console.log('Invalid Password')
            return NextResponse.json({message:"Incorrect Password"},{status:400})
        }
        const response = NextResponse.json({
            message:"Login successful!",
            success:true
        })
        console.log(response)
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }
        const token = jwt.sign(tokenData,process.env.JWT_SECRET!,{expiresIn:"1d"})
        response.cookies.set('token',token,{
            httpOnly:true,
        })
        return response
    } catch (error:any) {
        console.log("Error in login route: ",error.message)
        return NextResponse.json({error:"Error in login route"},{status:500})
    }
}