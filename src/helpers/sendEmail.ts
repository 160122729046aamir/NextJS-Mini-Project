import User from '@/models/user.model'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'

export async function sendEmail({email,emailType,userId}:any){
    const hashedToken = await bcrypt.hash(userId.toString(),10)
    if (emailType==="VERIFY"){
    await User.findOneAndUpdate({email},{
        verifyToken:hashedToken,verifyTokenExpiry: Date.now() + 60*60*1000
    })}
    if (emailType === "RESET"){
    await User.findOneAndUpdate({
            forgotPasswordToken:hashedToken, forgotPasswordTokenExpiry: Date.now() + 60*60*1000
        })
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
    const response =  await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
        to: "bar@example.com, baz@example.com",
        subject: emailType==="VERIFY"? "verify your email" :"Reset your password",
        html: emailType==="VERIFY"? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`: `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
            </p>`
    })
    return response
}