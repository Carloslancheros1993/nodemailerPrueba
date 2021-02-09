import express from "express";
import authRouter from "./routes/auth";
import sendEmail from "./utils/nodemailer";

const app = express();

app.use(express.json());
app.use(authRouter);

app.post("/send-email", (req, res) => {
    try{
        sendEmail();
        res.json({
            message: "El correo ha sido enviado satisfactoriamente"
        });
    }catch(error){
        console.log(error);
    }
});

export default app;