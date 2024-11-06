import nodemailer from 'nodemailer';
import { creds } from '../config'; // Import your creds from config file

// Create the Nodemailer transport object
const transport = {
    host: creds.HOST,
    port: creds.MAILPORT,
    auth: {
        user: creds.USER,
        pass: creds.PASS,
    },
    from: creds.EMAIL,
};

const transporter = nodemailer.createTransport(transport);

export default async function handler(req, res) {
    // Handle POST requests
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Compose the email message
        const mail = {
            from: `${name} <${creds.EMAIL}>`,
            to: creds.EMAIL,
            subject: `New Portfolio Message from ${name}`,
            text: `name: ${name} \n email: ${email} \n message: ${message}`,
        };

        try {
            // Send the main message to your email
            const data = await transporter.sendMail(mail);

            // If successful, send a response back to the frontend
            res.status(200).json({ status: 'success' });

            // Send an auto-reply message to the user
            const autoReply = {
                from: `${creds.YOURNAME} <${creds.EMAIL}>`,
                to: email,
                subject: 'Message received',
                text: `Hi ${name},\nThank you for sending me a message. I will get back to you soon.\n\nBest Regards,\n${creds.YOURNAME}\n${creds.YOURSITE}\n\n\nMessage Details\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
                html: `<p>Hi ${name},<br>Thank you for sending me a message. I will get back to you soon.<br><br>Best Regards,<br>${creds.YOURNAME}<br>${creds.YOURSITE}<br><br>Message Details:<br>Name: ${name}<br>Email: ${email}<br>Message: ${message}</p>`,
            };

            await transporter.sendMail(autoReply);
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ status: 'fail', message: error.message });
        }
    } else {
        // Return 405 Method Not Allowed for non-POST requests
        res.status(405).json({ status: 'fail', message: 'Method Not Allowed' });
    }
}