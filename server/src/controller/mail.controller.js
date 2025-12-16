import { sendMail } from "../utils/mail.js";
import {
  welcomeTemplate,
  resetPasswordTemplate,
  bookingTemplate,
} from "../utils/emailTemplate.js";

const mailService = {
  sendRegistrationEmail: async (user, verificationLink) => {
    const emailBody = welcomeTemplate(user.fullname, verificationLink);
    await sendMail({
      to: user.email,
      subject: "Verify Your account",
      html: emailBody,
    });
  },
  sendPasswordResetEmail: async (user, passwordLink) => {
    const emailBody = resetPasswordTemplate(user.fullname, passwordLink);
    await sendMail({
      to: user.email,
      subject: "Reset Password",
      html: emailBody,
    });
  },
  sendBookingConfirmation: async (user, booking) => {
    const emailBody = bookingTemplate(user.fullname, booking);
    await sendMail({
      to: user.email,
      subject: "Booking Confirmation",
      html: emailBody,
    });
  },
};

export default mailService;
