const nodemailer = require("nodemailer");


const sendEmailTo = async (receiverEmail,subject,htmlMessage) => {
    
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
    service : "gmail",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD,
    },
    });

    try {
        // Wrap in an async IIFE so we can use await.
        const info = await transporter.sendMail({
            from: process.env.EMAIL_SENDER,
            to: receiverEmail,
            subject: subject,
            html: htmlMessage, // HTML body
        });

        console.log("Message sent:", info.messageId);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }

}


module.exports = {sendEmailTo}









