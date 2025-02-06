import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user.model";
import { NextRequest,NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try {
        const userId = getDataFromToken(request);
        const user = await User.findById(userId).select('-password');
        if (!user){
            return NextResponse.json({
                message:"No User Found!",
                status: 404
            })
        }
        return NextResponse.json({
            message:"User Data Fetched Successfully",
            user
        })
    } catch (error:any) {
        console.log(error.response?.data?.message)
        NextResponse.json({error:error.message},{status:500})
    }
}