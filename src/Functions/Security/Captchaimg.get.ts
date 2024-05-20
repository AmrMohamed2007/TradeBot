import { Client } from "discord.js";

async function GetShapeLang(client:Client,guildid:string) {
    const lang = await client.langdata.get(guildid);
   
    
    const shapes = client.shapes[lang].shapes
 
    
    const RightShape = shapes[Math.floor(Math.random() * shapes.length)]
    return RightShape;

}



export default {GetShapeLang}