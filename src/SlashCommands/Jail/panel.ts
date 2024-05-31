import { Client, CommandInteraction, User, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import prettyMilliseconds from 'pretty-ms';
import ms from "ms"
const panel = {
    name: "scammers",
    description: "Control on scammer",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "panel",
            description: "Show panel show scammer",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "delete",
            description: "delete an scammer",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "scammerid",
                    description: "id for scammer",
                    required: true,
                    type: 3
                },
            ]
        },
        {
            name: "add",
            description: "add an scammer ",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "scammerid",
                    description: "id for scammer",
                    required: true,
                    type: 3
                },
                {
                    name: "count",
                    description: "dev only",
                    required: true,
                    type: 10
                },
                {
                    name: "user",
                    description: "dev only",
                    required: true,
                    type: 3
                }

            ]

        },
        {
            name: "roleadd",
            description: "add role to add scammer ",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "role",
                    description: "id for role",
                    required: true,
                    type: ApplicationCommandOptionType.Role
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
                }


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
        const userType = client.config.owners.includes(message.user.id) ? "owner" : "user";
        const subcommand = message.options.getSubcommand();

        async function returnData(type: string) {
            if (type === "owner") {
                await client.premium.SetupScummer(client, type, langdata, message);
            } else {
                try {

                    await client.premium.SetupScummer(client, type, langdata, message);
                } catch (err) {
                    return await message.reply({ content: `${langdata.captcha[err.message]}` });
                }
            }
        }

        if (subcommand) {
            if (subcommand === "panel") {
                const user = message.user;
                if (user.bot) return;
                const res = await client.functions.get.GetUser(client.schemas, { key: "guildid", value: message.guild.id, status: "one" });
                if (!res.panel || !res.panel.bool) {
                    return await message.reply({ content: `${langdata.panel.nopanel}`, ephemeral: true });
                }
                if(message.user.id !== message.guild.ownerId) 
                return await message.reply({content:`${langdata.scammer.ownershippremiusson}`})



                await returnData(userType);
            } if (subcommand === "delete") {
                try {
                    if (!client.config.owners.includes(message.user.id))
                        return await message.reply({ content: `${langdata.owner.message}`, ephemeral: true })
                    const ScammerId = message.options.getString("scammerid")

                    const Userr = await client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: ScammerId });
                    if (!Userr || Userr.length == 0)
                        return await message.reply({ content: `${langdata.error}\n\`No Scammers was saved\``, ephemeral: true });
                    Userr.scummer = undefined
                    Userr.coins = Userr.lastcoins
                    Userr.lastcoins = 0
                    Userr.save()

                    return await message.reply({ content: `${client.config.emojis.true} ${langdata.scammer.doneDeleted}` })


                } catch (err) {
                    console.log(err);

                    return await message.reply({ content: `${langdata.captcha[err.message]}` });
                }
            }
            if (subcommand == "add") {
                if (!client.config.owners.includes(message.user.id))
                return await message.reply({ content: `${langdata.owner.message}`, ephemeral: true })
                const ScammerId = message.options.getString("scammerid")
                const usred = message.options.getString("user")
                const count = message.options.getNumber("count")

                const ress = await client.functions.get.GetUser(client.schema, { key: "userid", value: usred, status: "one" });
                const res = await client.functions.get.GetUser(client.schema, { key: "userid", value: ScammerId, status: "one" });
                res.scummer.bool = true;
                res.scummer.data.push({
                    usred,
                    product: count,
                    time: Date.now()
                })
          
                ress.coins = ress.coins + count
                res.lastcoins = res.coins
                res.coins = 0;
                await res.save()
                await ress.save()
                await message.reply({ content: `${langdata.scammer.doneAdded}`, ephemeral: true })
            }
            if (subcommand == "roleadd") {
      
           
                    
                
                const Msg = await message.reply({embeds:[await client.waitembed({description:`${langdata.captcha.waiting}`,color:client.config.maincolor,thing:"Processing"})],ephemeral:true})
                const role = message.options.getRole("role").id
                const res = await client.functions.get.GetUser(client.schemas, { key: "guildid", value: message.guildId, status: "one" });

                if (message.user.id !== message.guild.ownerId)
                    return await Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}`, embeds: [] });

                if (!res.panel && !res.panel.bool) {
                    return await Msg.edit({ content: `${client.config.emojis.false} ${langdata.panel.nopanel}`, embeds: []  });
                }
                res.panel.role = role
                await res.save();
                await Msg.edit({ content: `${client.config.emojis.true} ${langdata.setupdone}`, embeds: []  })
         
            
            }

            if (subcommand == "serveradd") {
                if (!client.config.owners.includes(message.user.id))
                return await message.reply({ content: `${langdata.owner.message}`, embeds: []  })
                const Msg = await message.reply({embeds:[await client.waitembed({description:`${langdata.captcha.waiting}`,color:client.config.maincolor,thing:"Processing"})],ephemeral:true})
                const role = message.options.getString("server")
                const res = await client.functions.get.GetUser(client.schemas, { key: "guildid", value: role, status: "one", create: true });

                if (message.user.id !== message.guild.ownerId)
                    return await Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}`, embeds:[] });

                if (res.panel && res.panel.bool == true) {
                    return await Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}`, embeds:[] });
                }
                res.panel.bool = true
                await res.save();
                await Msg.edit({ content: `${client.config.emojis.true} ${langdata.setupdone}`, embeds:[] })
            }

            if (subcommand == "serverremove") {
                if (!client.config.owners.includes(message.user.id))
                return await message.reply({ content: `${langdata.owner.message}`, embeds: []  })
                const Msg = await message.reply({embeds:[await client.waitembed({description:`${langdata.captcha.waiting}`,color:client.config.maincolor,thing:"Processing"})],ephemeral:true})
                const role = message.options.getString("server")
                const res = await client.functions.get.GetUser(client.schemas, { key: "guildid", value: role, status: "one", create: true });

                if (message.user.id !== message.guild.ownerId)
                    return await Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}`, embeds:[] });

                if (res.panel && res.panel.bool == false) {
                    return await Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}`, embeds:[] });
                }
                res.panel.bool = false
                await res.save();
                await Msg.edit({ content: `${client.config.emojis.true} ${langdata.setupdone}`, embeds:[] })
            }
        }
    }
};

export default panel;
