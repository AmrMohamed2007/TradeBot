import { Client } from "discord.js";

async function CaptchaPassword(password:string,realpassword:string) {
    if(password == realpassword) {
        return true;
    }else {
        return false;
    }
}


export default {CaptchaPassword}