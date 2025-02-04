import { Client, CommandInteraction, User, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import prettyMilliseconds from 'pretty-ms';
import ms from "ms"
const panel = {
    name: "blacklist",
    description: "Control on blacklist",
    type: ApplicationCommandType.ChatInput,
    options: [
       
        {
            name: "deleteuser",
            description: "delete an user from blacklist",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "userid",
                    description: "id for user",
                    required: true,
                    type: 3
                },
            ]
        },
        {
            name: "adduser",
            description: "add an user to blacklist ",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "userid",
                    description: "id for userid",
                    required: true,
                    type: 3
                },
             
                {
                    name: "reason",
                    description: "reason for blacklist",
                    required: true,
                    type: 3
                }

            ]

        },
        {
            name: "view",
            description: "view blacklisted user",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "type",
                    description: "type for blacklist",
                    required: true,
                    type: ApplicationCommandOptionType.String 
                },
                {
                    name: "id",
                    description: "id for user",
                    required: true,
                    type: ApplicationCommandOptionType.String
                }


            ]

        },
        {
            name: "serveradd",
            description: "add server to manage scammer ",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "serverid",
                    description: "serverid for scammer",
                    required: true,
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: "reason",
                    description: "serverid for scammer",
                    required: true,
                    type: ApplicationCommandOptionType.String
                },


            ]

        },
        {
            name: "serverremove",
            description: "remove server from servers scammer ",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "serverid",
                    description: "serverid for scammer",
                    required: true,
                    type: ApplicationCommandOptionType.String
                }


            ]

        },
    ],
    cooldown: 20000,
    botPerms: ["AddReactions", "SendMessages"],
    run: async (client: Client, message: any, langdata: any) => {
        const type = message.options.getString("type");
     
        const subcommand = message.options.getSubcommand();

        async function returnData(type: string,id: string) {
       
        if(type == "server") {
            const res = await client.functions.get.GetUser(client.schemas, { key: "guildid", value: id, status: "one",create:true });
            const embed = await client.CreateEmbed({
                title:"Server Info",
                color:client.config.maincolor,
                fields:[
                    {name:`ServerId`,value:res.guildid,inline:false},
                    {name:"Blacklisted",value:res.blacklisted.bool ? "Yes" : "No",inline:false},
                    {name:"Reason",value:res.blacklisted.reason ? res.blacklisted.reason : "No Reason"}
                ]
            })

            await message.reply({embeds:[embed],ephemeral:true})
        }
        if(type == "user") {
            const res = await client.functions.get.GetUser(client.schema, { key: "userid", value: id, status: "one",create:true });
            if(res) {
                const embed = await client.CreateEmbed({
                    title:"User Info",
                    color:client.config.maincolor,
                    fields:[
                        {name:`Userid`,value:res.userid,inline:false},
                        {name:"Blacklisted",value:res.blacklisted.bool ? "Yes" : "No",inline:false},
                        {name:"Reason",value:res.blacklisted.reason ? res.blacklisted.reason : "No Reason",inline:false}
                    ]
                })
    
                await message.reply({embeds:[embed],ephemeral:true})
            }else {
                return await message.reply({content:`**${client.config.emojis.false} ${langdata.error}**`,ephemeral:true})
            }
          
        }
        }

        if (subcommand) {
            if (subcommand === "view") {
              
             
           
           
                const id = message.options.getString("id");

                await returnData(type,id);
            } if (subcommand === "deleteuser") {
                try {
                    if (!client.config.owners.includes(message.user.id))
                        return await message.reply({ content: `${langdata.owner.message}`, ephemeral: true })
                    const ScammerId = message.options.getString("userid")

                    const Userr = await client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: ScammerId });
               
                        Userr.blacklisted = undefined
                    Userr.save()

                    return await message.reply({ content: `${client.config.emojis.true} ${langdata.setupdone}` })


                } catch (err) {
                    console.log(err);

                    return await message.reply({ content: `${langdata.captcha[err.message]}` });
                }
            }
            if (subcommand == "adduser") {
                if (!client.config.owners.includes(message.user.id))
                return await message.reply({ content: `${langdata.owner.message}`, ephemeral: true })
                const ScammerId = message.options.getString("userid")
                const reason = message.options.getString("reason")
            

                const res = await client.functions.get.GetUser(client.schema, { key: "userid", value: ScammerId, status: "one" });
                res.blacklisted.bool = true;
                res.blacklisted.reason = reason; 
                res.blacklisted.time = Date.now(); 
          
              
                await res.save()
               
                await message.reply({ content: `${client.config.emojis.true} ${langdata.setupdone}`, ephemeral: true })
          
            }
       

            if (subcommand == "serveradd") {
                if (!client.config.owners.includes(message.user.id))
                return await message.reply({ content: `${langdata.owner.message}`, embeds: []  })
                const Msg = await message.reply({embeds:[await client.waitembed({description:`${langdata.captcha.waiting}`,color:client.config.maincolor,thing:"Processing"})],ephemeral:true})
                const role = message.options.getString("serverid")
                const reason = message.options.getString("reason")
                const res = await client.functions.get.GetUser(client.schemas, { key: "guildid", value: role, status: "one", create: true });

            
                if (res.blacklisted && res.blacklisted.bool == true) {
                    return await Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}`, embeds:[] });
                }
                res.blacklisted.bool = true
                res.blacklisted.reason = reason
                await res.save();
                await client.guilds.cache.get(role)?.leave();
                await Msg.edit({ content: `${client.config.emojis.true} ${langdata.setupdone}`, embeds:[] })
            }

            if (subcommand == "serverremove") {
                if (!client.config.owners.includes(message.user.id))
                return await message.reply({ content: `${langdata.owner.message}`, embeds: []  })
                const Msg = await message.reply({embeds:[await client.waitembed({description:`${langdata.captcha.waiting}`,color:client.config.maincolor,thing:"Processing"})],ephemeral:true})
                const role = message.options.getString("serverid")
                const res = await client.functions.get.GetUser(client.schemas, { key: "guildid", value: role, status: "one", create: true });

          
                if (res.blacklisted && res.blacklisted.bool == false) {
                    return await Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}`, embeds:[] });
                }
                res.blacklisted = undefined
                await res.save();
                await Msg.edit({ content: `${client.config.emojis.true} ${langdata.setupdone}`, embeds:[] })
            }
        }
    }
};

export default panel;
