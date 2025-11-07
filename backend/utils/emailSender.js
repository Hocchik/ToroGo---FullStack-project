import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendResetTokenEmail = async (to, token) => {
  console.log(`EMAIL USER: ${process.env.EMAIL_USER}`);
  console.log(`EMAIL_PASSWORD: ${process.env.EMAIL_PASSWORD}`);
  console.log(`CLientID: ${process.env.OAUTH_CLIENTID}`)
  console.log(`CLIENT_SECRET,: ${process.env.OAUTH_CLIENT_SECRET}`)
  console.log(`REFRESH_TOKEN,: ${process.env.OAUTH_REFRESH_TOKEN}`)


 const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

  const mailOptions = {
    from: 'ToriGo! <no-reply@torigo.com>',
    to,
    subject: 'Recuperación de contraseña',
    html: `
      <p>Hola,</p>
      <p>Has solicitado recuperar tu contraseña. Usa el siguiente código para continuar:</p>
      <h2>${token}</h2>
      <p>Este código expira en 15 minutos.</p>
      <p>Si no solicitaste esto, ignora este mensaje.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};