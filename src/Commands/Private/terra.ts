import { Client, Message, User } from "discord.js";

const terra = {
    name: "terra",
    aliases:["t"],
    cooldown:20000,
    run: async (client: Client, message: Message, args: any, langdata: any) => {
        

        async function ReturnData(user:User) {

      
        await client.functions.get.GetUser(client.schema, { key: "userid", value: user.id, status: "one" }).then(async (res) => {
          
            if(res.blacklisted.bool || res.scummer.bool) return;

            if(!res.password) { 
                const embed = await client.CreateEmbed({
                    title: langdata.private.titleuser, fields: [
                        { value: `${user.id}`, name: `${langdata.private.userid}`, inline: true },
                        { value: `${res.secured ? `${client.config.emojis.passwordver.repeat(4)}` : res.coins}`, name: `${langdata.private.coins}`, inline: true },
                    ],
                    color: client.config.maincolor,
         
                    
                })
                message.reply({ embeds: [embed] })
            }
            if(res.password) {
                if(user.id !== message.author.id) {
                    const embed = await client.CreateEmbed({
                        title: langdata.private.titleuser, fields: [
                            { value: `${user.id}`, name: `${langdata.private.userid}`, inline: true },
                            { value: `${client.config.emojis.passwordver.repeat(4)}`, name: `${langdata.private.coins}`, inline: true },
                        ],
                        color: client.config.maincolor,
             
                        
                    })
                    message.reply({ embeds: [embed] })
                }else {
                 
                    
                    await client.captcha.CaptchaReact(client,message,langdata,"terraShow")
                }
               
            }
          
        
            
       
            
        }).catch(async (err) => {
          


            await message.reply({ content: `${langdata.captcha[err.message]}` })
        })


    }

    if(args) {
        
        var user= message.mentions.users.first() ? message.mentions.users.first() : client.users.cache.get(args[0]);
        if(!user) user = message.author;
        if(user.bot) return;
        await ReturnData(user)
        
    }else {
        if(message.author.bot) return;
        await ReturnData(message.author);
    }
}
}

export default terra;