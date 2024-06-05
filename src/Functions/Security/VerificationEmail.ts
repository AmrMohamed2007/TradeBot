import { Client } from "discord.js";

async function SendMail(client:Client,to:string,langdata:any,res,data,type) {
    return new Promise(async (resolve,reject) => {
        if(type == client.types.CreateNewAccount) {

      
        if(!to.includes("@"))
       return reject(`${langdata.components.createAccount.emailVaild}`);
        const code = await client.public.generateRandomGmail();
        res.code = code;
        res.sendAt = Date.now();
        res.email = data.gmail
        res.firstname = data.firstname
        res.lastname = data.lastname
        await res.save();
       const mailOptions = {
            from: "discordtradebot@gmail.com",
            to, 
            subject: 'Email Verification',
            text: `Thank you for creating account in our services , Your verification code is : ${code}`
        };

        client.transporter.sendMail(mailOptions, async (error, info) => {
            if(error) 
            return reject(error.message);
            resolve("done")
        })
    }
    if(type == client.types.ForgetPasswrod) {
        const code = await client.public.generateRandomGmail(16);
        const mailOptions = {
            from: "discordtradebot@gmail.com",
            to, 
            subject: 'New Password Generator !',
            text: `The password has been successfully reset.\n The New password is : ${code}`
        };
 
        res.password = code;
        await res.save();
        client.transporter.sendMail(mailOptions, async (error, info) => {
            if(error) 
            return reject(error.message);
            resolve("done")
        })
    }

    })  
}

export default { SendMail }