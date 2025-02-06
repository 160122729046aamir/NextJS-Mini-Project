import User from "@/models/user.model";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request : NextRequest) {
    try {
        const reqBody = await request.json();
        const {token}=reqBody;
        const user = await User.findOne({
            verifyToken:token,
            verifyTokenExpiry: { $gt: Date.now() }
        })
        if (!user){
            return NextResponse.json({message:"Invalid Token"},{status:404})
        }
        user.isVerified = true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();
        return NextResponse.json({
            message:"User Verified Successfully!",
            success:true
        })
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({error:error.message},{status:500})
    }
}