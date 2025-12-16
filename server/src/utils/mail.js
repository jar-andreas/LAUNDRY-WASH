import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  requireTLS: true, //upgrade to secure conn once connected
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
  tls: {
    //reject unauthorized cert in production env, for security
    rejectUnauthorized: process.env.NODE_ENV === "production",
  },
});

//verify email connection
const verifyEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log("Email service connection verified");
  } catch (error) {
    console.error("Failed to connect to email services", {
      error: error.message,
      code: error.code,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

verifyEmailConnection().catch(console.error);

export const sendMail = async ({ to, subject, html }) => {
  console.log({to, html})
  const mailOptions = {
    from: "LAUNDRY WASH <laundrywash@gmail.com>",
    to,
    subject,
    html,
  };
  try {
    const res = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", res.messageId);
  } catch (error) {
    console.error("Error sending mail:", {
      error: error.message,
      code: error.code,
      stack: error.stack,
    });
  }
};

// sendMail({
//   to: "adejareadeyinka0@gmail.com", // <-- change to a second email
//   subject: "Test Email from Nodemailer",
//   html: `
//     <h1>Hello!</h1>
//     <p>This is a test email to make sure Nodemailer works.</p>
//   `
// });
