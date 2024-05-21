import {  Client, ComponentType } from "discord.js";

async function CaptchaReact(client:Client,message:any,langdata:any,fun:any,typeSecurity:boolean) {
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
     client.functions.get.GetUser(client.schema,{status:"one",key:"userid",value:userid}).then(async (res) => {
        
        if(!res.password && typeSecurity == true) 
        return await message.reply({content:`${langdata.captcha.nopassword}`,ephemeral:true});

        if(res.password) {

     
 
    const Msg = await message.reply({content:`${langdata.captcha.passwordtype}`,components:[await client.captcha.ReturnBtnPassword(client,langdata)],ephemeral:true})
  
    
    const collecterer =  await message.channel.createMessageComponentCollector({filter:u => u.user.id == userid,max:1}) 

    
    collecterer.on("collect" , async col => {
    
        
        
        if(col.customId == "passwordcheck") {
            
            await Msg.delete()
            await col.showModal(await client.captcha.ReturnModalPassword(langdata,fun))

        }
    })
}else {
    client.emit(fun,message,langdata)
}
}).catch((err) => {
    console.log(err);
    
    message.reply({content:`${langdata.captcha[err.message]}`})
 })

    

}

export default {CaptchaReact}