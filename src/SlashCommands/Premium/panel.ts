import { Client, CommandInteraction, User, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import prettyMilliseconds from 'pretty-ms';

const terra = {
    name: "premium",
    description: "show your book of terra",
    type: ApplicationCommandType.ChatInput,
    options: [
        { name: "panel", description: "show panel to control on your bank account", type: ApplicationCommandOptionType.Subcommand },
        { name: "info", description: "show info for your account", type: ApplicationCommandOptionType.Subcommand }

    ],
    run: async (client: Client, message: any, langdata: any) => {
        var userType = client.config.owners.includes(message.user.id) ? "owner" : "user"
        const args = message.options.getSubcommand("panel") 
 
    
        async function ReturnData(user: User,type:string) {
            
            if(type == "owner") {
                await client.premium.SetupPanel(client,type,langdata,message)
            }else {

          
            await client.functions.get.GetUser(client.schema, { key: "userid", value: user.id, status: "one" }).then(async (res) => {
                if(!res.premium || !res.premium.subscribed)
                return await message.reply({content:`${langdata.premium.nopre}`});

           await client.premium.SetupPanel(client,type,langdata,message)

            }).catch(async (err) => {
                return await message.reply({content:`${langdata.captcha[err.message]}`})
                
            })
        }
        }

        if (args) {
       
           
            if(args == "panel") {
             
                
                var user = message.user
                if(user.bot) return;
                await ReturnData(user,userType)
            }
           if(args == "info") {
            
            await client.functions.get.GetUser(client.schema, { key: "userid", value: message.user.id, status: "one" }).then(async (res) => {
                if(!res.premium || !res.premium.subscribed)
                return await message.reply({content:`${langdata.premium.nopre}`});

                const embed = await client.CreateEmbed({
                    title: langdata.premium.titleinfo, fields: [
                        { value: `${message.user.id}`, name: `${langdata.private.userid}`, inline: false },
                        { value: `${new Date(res.premium.createdAt).toDateString()}`, name: `${langdata.premium.createdAt}`, inline: false },
                        { value: `${new Date(Date.now() + res.premium.days).toDateString()}`, name: `${langdata.premium.endsAt}`, inline: false },
                        { value: `${prettyMilliseconds((res.createdAt + res.premium.days) - Date.now())}`, name: `${langdata.premium.days}`, inline: false },

                    ],
                    color: client.config.maincolor,
                    author: { name: message.guild.name, iconURL: message.guild.iconURL() },
                    footer: { name: message.guild.name, iconURL: message.guild.iconURL() },
                    
                })
          
                await message.reply({embeds:[embed]})
            }).catch(async (err) => {
                return await message.reply({content:`${langdata.captcha[err.message]}`})
                
            })
           }

        }
    }
}

export default terra;