import { NextRequest,NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message: "Logout Successful",
            success: true
        })
        response.cookies.set('token','',{maxAge:0})
        return response
    } catch (error:any) {
        NextResponse.json({error:error.message},{status:500})
        console.log("Error in logout route: ",error.message)
    }
}