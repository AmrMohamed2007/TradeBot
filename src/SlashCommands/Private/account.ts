import { Client, Message, User ,ApplicationCommandType, CommandInteraction} from "discord.js";
import ms from "ms"
const Ping = {
    name: "account",
    description: "show your Bank info",
    type: ApplicationCommandType.ChatInput,
    options: [
        { name: "user", description: "show bank data for user", type: 6, required: false }
    ],
    cooldown:10000,
    databaseActions:["blacklist","scummer"],
    run: async (client: Client, message: CommandInteraction,  langdata: any) => {
        const args =  message.options.get("user") ? message.options.get("user")?.user : message.user


        async function ReturnData(user:User) {

      
        await client.functions.get.GetUser(client.schema, { key: "userid", value: user.id, status: "one" }).then(async (res) => {
          
            
                
          
            if ((Date.now() - res.premium.createdAt) >= ms(`${res.days}`)) {
                res.premium = undefined;
                await res.save()
            }
            
            const embed = await client.CreateEmbed({
                title: langdata.private.titleuser, fields: [
                    { value: `${user.id}`, name: `${langdata.private.userid}`, inline: false },
                    { value: user.username, name: `${langdata.private.username}`, inline: false },
                    { value: user.displayName, name: `${langdata.private.displayname}`, inline: false },
                    { value: res.blacklisted && res.blacklisted.bool ? langdata.private.yes : langdata.private.no, name: `${langdata.private.blacklisted}`, inline: false },
                    { value: res.premium && res.premium.subscribed ? langdata.private.yes : langdata.private.no, name: `${langdata.private.premium}`, inline: false },
                    { value: `${new Date(res.createdAt).toDateString()}`, name: `${langdata.private.createdAt}`, inline: false },
                ],
                color: client.config.maincolor,
                author: { name: message.guild.name, iconURL: message.guild.iconURL() },
                footer: { name: message.guild.name, iconURL: message.guild.iconURL() },
                
            })
           await message.reply({ embeds: [embed] })
        }).catch(async (err) => {
       
            await message.reply({ content: `${langdata.captcha[err.message]}` })
        })


    }

    if(args) {
        
        var user= args
        if(user.bot) return;
        await ReturnData(user)
        
    }else {
        if(message.user.bot) return;
        await ReturnData(message.user);
    }
}
}

export default Ping;