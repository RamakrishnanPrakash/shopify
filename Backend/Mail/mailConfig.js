import nodemailer from "nodemailer";
import dotenv from "dotenv";

const mailSend = async (to, subject, content) => {
  dotenv.config();
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
       user:process.env.user,
       pass:process.env.pass
      },
    });

    const mailOptions = {
      from: "mdiy psxb ubnt ylct",
      to: to, // Recipient(s)
      subject: subject, // Subject line
      html: content,
    };
    const info = await transporter.sendMail(mailOptions);
    if (info.accepted) {
      return { msg: info.id, success: true };
    }
  } catch (error) {
    console.log(error);
    return { msg: error.message, success: false };
  }
};

export default mailSend;
