import nodemailer from "nodemailer";
import {google} from "googleapis";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_SECRET;
const googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;
const Oauth2 = google.auth.OAuth2;

const oauth2Client = new Oauth2(googleClientId, googleSecret, "https://developers.google.com/oauthplayground");

oauth2Client.setCredentials({
    "refresh_token": googleRefreshToken
});

const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "carloslancheros470@gmail.com",
        clientId: googleClientId,
        clientSecret: googleSecret,
        refreshToken: googleRefreshToken,
        accessToken: accessToken
 
    },
    tls: {
        rejectUnauthorized: false
    }
});

const mailOptions = {
    from: "carloslancheros470@gmail.com",
    to: "lancheros.carlos@hotmail.com",
    subject: "Prueba",
    generateTextFromHTML: true,
    html: "<b>Hola mundo</b>"
}

const sendEmail = () => {
    smtpTransport.sendMail(mailOptions, (error, info) => {
    if(error){
        console.log(error);
    }else{
        console.log(info);
    }
});
}

export default sendEmail;

