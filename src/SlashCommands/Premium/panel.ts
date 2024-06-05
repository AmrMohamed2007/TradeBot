import { Client, CommandInteraction, User, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import prettyMilliseconds from 'pretty-ms';
import ms from "ms"
const panel = {
    name: "premium",
    description: "Show your book of terra",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "panel",
            description: "Show panel to control your bank account",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "info",
            description: "Show info for your account",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "buy",
            description: "buy a premium subscription for month/year ",
            type: ApplicationCommandOptionType.Subcommand

        },
        {
            name: "give",
            description: "give a premium subscription for month/year ",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "userid", description: "userid for user", type: 3, required: true },
                { name: "duration", description: "time for premium", type: 3, required: true }
            ]

        },
        {
            name: "remove",
            description: "remove a premium subscription for user ",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "userid", description: "userid for user", type: 3, required: true },
            ]
        },
        {
            name: "redeam",
            description: "redeam a premium subscription for month/year ",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "code", description: "code for subscription", type: 3, required: true },
            ]

        },
        {
            name: "generate",
            description: "generate a premium subscription for month/year ",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "count", description: "type of count", required: true, type: 10 },
                { name: "duration", description: "durtion", required: true, type: 3 },
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
                await client.premium.SetupPanel(client, type, langdata, message);
            } else {
                try {

                    await client.premium.SetupPanel(client, type, langdata, message);
                } catch (err) {
                    return await message.reply({ content: `${langdata.captcha[err.message]}` });
                }
            }
        }

        if (subcommand) {
            if (subcommand === "panel") {
                const user = message.user;
                if (user.bot) return;
                const res = await client.functions.get.GetUser(client.schema, { key: "userid", value: message.user.id, status: "one" });
                if (!res.premium || !res.premium.subscribed) {
                    return await message.reply({ content: `${client.config.emojis.false} ${langdata.premium.nopre}`, ephemeral: true });
                }
                if ((Date.now() - res.premium.createdAt) >= ms(`${res.days}`)) {

                    res.premium = undefined;
                    await res.save()
                    return await message.reply({ content: `${client.config.emojis.false} ${langdata.premium.nopre}` });
                }

                await returnData(userType);
            } if (subcommand === "info") {
                try {
                    const res = await client.functions.get.GetUser(client.schema, { key: "userid", value: message.user.id, status: "one" });
                    if (!res.premium || !res.premium.subscribed) {
                        return await message.reply({ content: `${client.config.emojis.false} ${langdata.premium.nopre}` });
                    }
                    if ((Date.now() - res.premium.createdAt) >= ms(`${res.days}`)) {

                        res.premium = undefined;
                        await res.save()
                        return await message.reply({ content: `${client.config.emojis.false} ${langdata.premium.nopre}` });
                    }
                    const embed = await client.CreateEmbed({
                        title: langdata.premium.titleinfo,
                        fields: [
                            { name: langdata.private.userid, value: `${message.user.id}`, inline: false },
                            { name: langdata.premium.createdAt, value: `${new Date(res.premium.createdAt).toDateString()}`, inline: false },
                            { name: langdata.premium.endsAt, value: `${new Date(Date.now() + ms(`${res.premium.days}d`)).toDateString()}`, inline: false },
                            { name: langdata.premium.days, value: `${prettyMilliseconds((res.createdAt + ms(`${res.premium.days}d`)) - Date.now())}`, inline: false }

                        ],
                        color: client.config.maincolor,
                        author: { name: message.guild.name, iconURL: message.guild.iconURL() },
                        footer: { name: message.guild.name, iconURL: message.guild.iconURL() }
                    });

                    await message.reply({ embeds: [embed] });
                } catch (err) {
                    console.log(err);

                    return await message.reply({ content: `${client.config.emojis.false} ${langdata.captcha[err.message]}` });
                }
            }
            if (subcommand == "buy") {
                try {


                    const res = await client.functions.get.GetUser(client.schema, { key: "userid", value: message.user.id, status: "one" });

                    if (res.premium.subscribed && (Date.now() - res.premium.createdAt) >= ms(`${res.days}`)) {

                        res.premium = undefined;
                        await res.save()

                    }
                    await client.captcha.CaptchaShape(client, message, langdata, "reply", false, "premiumBuy")
                } catch (error) {
                    await message.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errornoacc}` })
                }
            }
            if (subcommand == "give") {
                if (!client.config.owners.includes(message.user.id))
                    return;
                const userid = message.options.getString("userid")
                
                
                const duration = message.options.getString("duration")
                await client.functions.get.GetUser(client.schema, {
                    status: "one",
                    key: "userid",
                    value: userid
                }).then(async (res) => {
                    const PremiumData = {
                        subscribed: true,
                        createdAt: Date.now(),
                        days: ms(duration),
                        code: await client.public.generateRandomCode()
                    }
                    if(res.premium.subscribed) {
                       res.premium.days =  res.premium.days + PremiumData.days
                       await client.Log.LogPremiumUser({
                        ...res.premium,
                        guildid: message.guild.id,
                        user: userid

                    }, langdata, client)
                  
                    }else {
                        res.premium = PremiumData
                        await client.Log.LogPremiumUser({
                            ...PremiumData,
                            guildid: message.guild.id,
                            user: userid
    
                        }, langdata, client)
                    }
                    await res.save();
                    await message.reply({ content: `${client.config.emojis.true} ${langdata.setupdone}`, ephemeral: true })
                  
                }).catch(async (err) => {
                    console.log(err);
                    
                    await message.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errornoacc}`, ephemeral: true })

                })
            }

            if (subcommand == "remove") {
                if (!client.config.owners.includes(message.user.id))
                    return;
                const userid = message.options.getString("userid")
                await client.functions.get.GetUser(client.schema, {
                    status: "one",
                    key: "userid",
                    value: userid
                }).then(async (res) => {

                    res.premium = undefined;
                    await res.save();
                    await message.reply({ content: `${client.config.emojis.true} ${langdata.setupdone}`, ephemeral: true })

                }).catch(async (err) => {
                    await message.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errornoacc}`, ephemeral: true })

                })
            }
            if (subcommand == "redeam") {
                const code = message.options.getString("code")
                await client.functions.get.GetUser(client.cupon, {
                    status: "one",
                    key: "cupon",
                    value: code
                }).then(async (res) => {
                    const PremiumData = {
                        subscribed: true,
                        createdAt: Date.now(),
                        days: ms(res.duration),
                        code: await client.public.generateRandomCode()
                    }
                    await client.functions.get.GetUser(client.schema, {
                        status: "one",
                        key: "userid",
                        value: message.user.id
                    }).then(async (ress) => {


                        ress.premium = ress.premium.subscribed ? ress.premium.days + PremiumData.days : PremiumData;

                        await client.Log.LogPremiumUser({
                            days: res.duration,
                            code: await client.public.generateRandomCode(),
                            guildid: message.guild.id,
                            user: message.user.id,
                            reason: "Cupon Code"

                        }, langdata, client)
                        await message.reply({ content: `${client.config.emojis.true} ${langdata.setupdone}`, ephemeral: true })
                        await ress.save();
                        await client.cupon.deleteOne({ cupon: code })
                    }).catch(async (err) => {


                        await message.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errornoacc}`, ephemeral: true })

                    })


                }).catch(async (err) => {
                    await message.reply({ content: `${client.config.emojis.false} ${langdata.error}`, ephemeral: true })

                })
            }

            if (subcommand == "generate") {
                if (!client.config.owners.includes(message.user.id))
                    return;
                const length = message.options.getNumber("count")
                const duration = message.options.getString("duration")
                const arr = []
                for (let i = 0; i < length; i++) {
                    const code = await client.public.generateRandomCode()
                    const acc = new client.cupon({
                        cupon: code,
                        duration

                    })
                    await acc.save()
                    arr.push(code)
                }
                const embed = await client.CreateEmbed({
                    title: "New Premium Subscription",
                    fields: [
                        arr.map((m) => {
                            return { name: "Cupon Name", value: m, inline: false }
                        })
                    ],
                    color: client.config.maincolor
                })

                await message.reply({ content: "**Done !**", ephemeral: true });
                await message.channel.send({ embeds: [embed] })

            }
        }
    }
};

export default panel;
