import {  Client, ComponentType } from "discord.js";

async function CaptchaShape(client:Client,message:any,langdata:any,type:string,typeSecurity:boolean,fun:any) {
 
   
    var userid = ""
    if(message.author) {
        userid = message.author.id
    }
    else if(message.user) {
        userid = message.user.id;

    }
    else {
        userid = message.interaction.user.id
    }
       
    const guildid = message.guild ? message.guild.id : message.interaction.guild.id
    
    const RightShape = await client.captcha.GetShapeLang(client,guildid)
    const rows = await client.captcha.ReturnShapesC(client,guildid)
    const Msg = type == "reply" ? await message.reply({content:`${langdata.captcha.shapetype.replace("[shape]",RightShape.name)}`,components:[...rows],ephemeral:true,embeds:[]}) : await message.edit({content:`${langdata.captcha.shapetype.replace("[shape]",RightShape.name)}`,ephemeral:true,components:[...rows],embeds:[]})
  
    
    const collecter = await Msg.createMessageComponentCollector({filter: u => u.user.id == userid,max:1,componentType:ComponentType.Button ,time:16000})

    collecter.on("collect" , async col => {
      const Check = await client.captcha.VerifyShape(col.customId.split("_")[1],RightShape.emoji)
        if(Check) {
            if(typeSecurity == false) {
               client.emit(fun,col,langdata)
                await message.delete()
            }else {
                await client.captcha.CaptchaReact(client,col,langdata,fun);
                await message.delete()
            }
         
        }else {
           const embed =  await client.waitembed({color:client.config.wrongcolor,description:`${langdata.captcha.errorcaptchashape}`})
            await message.edit({embeds:[embed],content:null,components:[]})
        }
    })

   
    

}

export default {CaptchaShape}