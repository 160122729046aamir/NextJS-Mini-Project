import { sendEmail } from "@/helpers/sendEmail";
import User from "@/models/user.model";
import { NextRequest,NextResponse } from "next/server";
import connect from '@/dbConfig/dbConfig'

connect();
export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email , username} = reqBody;
        const user = await User.findOne({
            email,username
        })
        if (!user){
            return NextResponse.json({
                message:"Invalid User",
                success: false
            },{status:400})
        
        }
        await sendEmail({email:user.email,emailType:"RESET",userId:user._id})
    return NextResponse.json({
        message:"Reset Link Sent Your MailTrap!"
    },{status:200})
    } catch (error:any) {
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
}