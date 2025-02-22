// Import the necessary modules here
import nodemailer from "nodemailer";
import "dotenv/config";

export const sendWelcomeEmail = async (user) => {
  // Write your code here
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMPT_SERVICE,
      auth: {
        user: process.env.STORFLEET_SMPT_MAIL,
        pass: process.env.STORFLEET_SMPT_MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.STORFLEET_SMPT_MAIL,
      to: user.email,
      subject: "Welcome to StoreFleet!",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0px 0px 10px 0px #ccc;
                    margin: auto;
                }
                h1, p {
                    text-align: center;
                    color: purple;
                }
                .header {
                   text-align: center;
                }
                .logo {
                    max-width: 150px;
                }
                .content {
                    margin-top: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #20d49a;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                }
                @media only screen and (max-width: 600px) {
                    .container {
                        padding: 10px;
                    }
                    .logo {
                        max-width: 100px;
                    }
                    .button {
                        display: block;
                        margin-top: 10px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
            <div class="header">
                    <img class="logo" src="https://files.codingninjas.in/logo1-32230.png" alt="Storefleet Logo" draggable="false">
                    <h2  class="header">Welcome to Storefleet</h2>
                </div>
            <div class="content">
                    <p>Hello, ${user.name}</p>
                    <p>Thank you for registering at StoreFleet. We are excited to have you as a new member of our community.</p>
                <p>
                <a class="button" href="">
                Get Started
                </a>
                </p>
            </div>
          </div>
        </body>
        </html>
        `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Welcome Email Notification Sent Successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
