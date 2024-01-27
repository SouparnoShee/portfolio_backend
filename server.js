import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import SendEmail from "./utils/SendEmail.js";
import { config } from "dotenv";

config({
    path: "./data/config.env",
})


const app = express();





app.use(express.json())
app.use(bodyParser.json())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST"],
    credentials: true,

}))


app.get("/", (req, res) => {
    res.status(200).send("<h1>Hello World</h1>")
})


app.post("/api/email", async (req, res) => {
    const { name, email, messages } = req.body;

    try {
        const send_from = process.env.EMAIL_USER;
        const send_to = process.env.EMAIL_RECIEVE;
        const subject = `Regarding the portfolio message by ${name}`
        const person = name;
        const mail = email;
        const body = messages;
        await SendEmail(send_from, send_to, subject, body, person, mail)
        res.status(200).json({
            success: true,
            message: "Email Sent Successfully"
        })

    } catch (error) {
        res.status(500).json(error.message)
    }

})




app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT} `)
})


console.log("hii")