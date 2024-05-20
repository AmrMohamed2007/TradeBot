import { Client, Message, User } from "discord.js";

const Ping = {
    name: "account",
    run: async (client: Client, message: Message, args: any, langdata: any) => {
        

        async function ReturnData(user:User) {

      
        await client.functions.get.GetUser(client.schema, { key: "userid", value: user.id, status: "one" }).then(async (res) => {
          
            
                
          
        
            
            const embed = await client.CreateEmbed({
                title: langdata.private.titleuser, fields: [
                    { value: `${user.id}`, name: `${langdata.private.userid}`, inline: false },
                    { value: user.username, name: `${langdata.private.username}`, inline: false },
                    { value: user.displayName, name: `${langdata.private.displayname}`, inline: false },
                    { value: res.blacklisted ? langdata.private.yes : langdata.private.no, name: `${langdata.private.blacklisted}`, inline: false },
                    { value: `${new Date(res.createdAt).toDateString()}`, name: `${langdata.private.createdAt}`, inline: false },
                ],
                color: client.config.maincolor,
                author: { name: message.guild.name, iconURL: message.guild.iconURL() },
                footer: { name: message.guild.name, iconURL: message.guild.iconURL() },
                
            })
            message.reply({ embeds: [embed] })
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

export default Ping;