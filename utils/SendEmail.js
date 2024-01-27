import nodemailer from "nodemailer"


const SendEmail = async (send_from, send_to, subject, body, person, mail) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
            ciphers: 'SSLv3'
        }
    });

    const options = {
        from: send_from,
        to: send_to,
        subject: subject,
        html: `<p>This is ${person}, <br/> email is ${mail}, <br/> My Message is - ${body}</p>`

    }

    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(info)
        }
    })
}


export default SendEmail