// This whole page is about sending an email.
// The goal is to get this email to the folks in charge,
// like the Security Assistant at the university.

import { NextResponse } from 'next/server';   // This helps us send back messages to the website, like "OK!" or "Something went wrong."
import nodemailer from 'nodemailer';        // This is like the special delivery service we're using to send the email.

export async function POST(req: Request) {
  // Someone sent info to this page (maybe they filled out a form).
  // This line grabs that info, which we expect to have a 'message' and info about the 'user'.
  const { message, user } = await req.json();       // It's like unwrapping a package to see what's inside, and we expect it to be in a format the computer understands (like a recipe).

  // Let's check if we got all the important stuff: a message, and the user's name and email.
  if (!message || !user || !user.name || !user.email) {
    // If something's missing, we can't send the report.
    // We'll send back a message saying it failed and the reason is "Invalid input" (like they didn't fill out all the boxes).
    return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 }); // 400 is like saying "Hey, you messed up the request."
  }     // That's it for the checking part.

  // Now we need some secret keys and addresses to make the email and other notifications work.
  const {
    EMAIL_USERNAME,    // This is our email address that will send the report. It's like the return address on an envelope.
    EMAIL_PASSWORD,    // This is the secret code for our email so we can log in and send stuff. Keep this safe!
    RECEIVER_EMAIL,    // This is the email address of the person who needs to get the report (like the Security Assistant).
    PUSHOVER_TOKEN,    // This is a secret key for sending notifications to the Pushover app (like a text message but for this app).
    PUSHOVER_USER,     // This is our user ID on the Pushover app, so it knows who to send the notification to.
  } = process.env;      // These are like secret variables stored outside our code, so they're not easy for bad guys to find.

  // Let's make sure we have the email addresses and passwords we need to send the email.
  if (!EMAIL_USERNAME || !EMAIL_PASSWORD || !RECEIVER_EMAIL) {
    // If we're missing any of these, we can't send the email.
    console.error("❌ Missing email environment variables"); // Let's log this error so we know what went wrong.
    return NextResponse.json({ success: false, error: "Email env vars not set" }, { status: 500 }); // 500 means "Oops, something went wrong on our end."
  }

  // Let's also check if we have the keys for the Pushover notifications.
  if (!PUSHOVER_TOKEN || !PUSHOVER_USER) {
    // If we're missing these, we can't send the Pushover notification.
    console.error("❌ Missing Pushover environment variables"); // Let's log this too.
    return NextResponse.json({ success: false, error: "Pushover env vars not set" }, { status: 500 }); // Another "Oops, our bad."
  }

  // Okay, we have the green light to try and send the email!
  // This part sets up how we're going to send it, like choosing the delivery service (Gmail).
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USERNAME,    // This is our email address again, to log in to Gmail.
      pass: EMAIL_PASSWORD,    // And this is our secret code to prove it's us.
    },
  });

  // Now let's put together the actual email message.
  const mailOptions = {
    from: EMAIL_USERNAME,    
    to: RECEIVER_EMAIL,      
    subject: "There is an issue in Caldwell University", // The title of the email, so they know what it's about.
    text: `
New Incident Report:

From: ${user.name}      
Email: ${user.email}      

Message:
${message}             
    `, // This is the main body of the email, just plain text.
  };

  // Now we're going to try to actually send the email and the Pushover notification.
  try {
    // Let's send the email!
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response); // If it worked, let's log that it was sent successfully.

    // Now, let's also send a notification to the Pushover app.
    const pushoverRes = await fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",      // We're sending info to the Pushover website.
      body: new URLSearchParams({ // We're packaging up the info to send.
        token: PUSHOVER_TOKEN, // Our secret key for Pushover.
        user: PUSHOVER_USER,  // Who on Pushover should get the notification?
        title: "🚨 Incident Report", // The title of the Pushover notification.
        message: `From: ${user.name} (${user.email})\n\n${message}`, // The main text of the notification, similar to the email.
      }),
    });

    const pushoverText = await pushoverRes.text(); // Let's see what Pushover says back.
    console.log("📲 Pushover response:", pushoverText); // Log the response from Pushover.

    // If everything went well, let's send back a message to the website saying it was a success!
    return NextResponse.json({ success: true });
  // Uh oh, something went wrong while trying to send the email or the Pushover notification.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ Error sending report:", error.message || error); // Let's log the error so we know what happened.
    return NextResponse.json({ success: false, error: error.message || "Internal error" }, { status: 500 }); // Tell the website it failed and give a reason.
  }

}

// Just some extra checks to see if our secret keys are loaded correctly when the code starts.
console.log("🛠️ ENV CHECK");
console.log("EMAIL_USERNAME:", process.env.EMAIL_USERNAME);
console.log("EMAIL_PASSWORD length:", process.env.EMAIL_PASSWORD?.length);