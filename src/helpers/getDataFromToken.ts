import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
export function getDataFromToken(request:NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || ''
        const decodedToken: any = jwt.verify(token,process.env.JWT_SECRET!)
        return decodedToken.id
    } catch (error:any) {
        console.log("Error in middleWare: ",error.response?.data?.message)
        throw new Error(error.message)
    }
    
}