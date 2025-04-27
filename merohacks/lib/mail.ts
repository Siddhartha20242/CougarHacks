import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
 
  const resetLink = `http://localhost:3001/auth/new-password?token=${token}`;
  await resend.emails.send({
  from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Reset your password',
    html: `<p> Click <a href="${resetLink}">here</a>to reset Password</p>`
  });

}

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
   
    const confirmLink = `http://localhost:3001/auth/new-verification?token=${token}`;
    await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Hello world',
      html: `<p> Click <a href="${confirmLink}">here</a>to Confirm Email</p>`
    });

}

// HEre the concept of resend is being used. So, the first thing we are doing here is to send the reset password email. We are sending the resetlink for sendpasswordresetEmail and
// send verificationEmail. 

// If you don't know what token is, it is a key that allows us to do somekind of specific interactions like changing the password and so on.










