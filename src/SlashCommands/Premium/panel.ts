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
    ],
    cooldown: 20000,
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
                    return await message.reply({ content: `${langdata.premium.nopre}`,ephemeral:true });
                }
                if ((Date.now() - res.premium.createdAt) >= ms(`${res.days}`)) {

                    res.premium = undefined;
                    await res.save()
                    return await message.reply({ content: `${langdata.premium.nopre}` });
                }

                await returnData(userType);
            } if (subcommand === "info") {
                try {
                    const res = await client.functions.get.GetUser(client.schema, { key: "userid", value: message.user.id, status: "one" });
                    if (!res.premium || !res.premium.subscribed) {
                        return await message.reply({ content: `${langdata.premium.nopre}` });
                    }
                    if ((Date.now() - res.premium.createdAt) >= ms(`${res.days}`)) {

                        res.premium = undefined;
                        await res.save()
                        return await message.reply({ content: `${langdata.premium.nopre}` });
                    }
                    const embed = await client.CreateEmbed({
                        title: langdata.premium.titleinfo,
                        fields: [
                            { name: langdata.private.userid, value: `${message.user.id}`, inline: false },
                            { name: langdata.premium.createdAt, value: `${new Date(res.premium.createdAt).toDateString()}`, inline: false },
                            { name: langdata.premium.endsAt, value: `${new Date(Date.now() + res.premium.days).toDateString()}`, inline: false },
                            { name: langdata.premium.days, value: `${prettyMilliseconds((res.createdAt + res.premium.days) - Date.now())}`, inline: false }
                        ],
                        color: client.config.maincolor,
                        author: { name: message.guild.name, iconURL: message.guild.iconURL() },
                        footer: { name: message.guild.name, iconURL: message.guild.iconURL() }
                    });

                    await message.reply({ embeds: [embed] });
                } catch (err) {
                    console.log(err);
                    
                    return await message.reply({ content: `${langdata.captcha[err.message]}` });
                }
            }
            if (subcommand == "buy") {
                const res = await client.functions.get.GetUser(client.schema, { key: "userid", value: message.user.id, status: "one" });

                if (res.premium.subscribed && (Date.now() - res.premium.createdAt) >= ms(`${res.days}`)) {

                    res.premium = undefined;
                    await res.save()
                 
                }
                await client.captcha.CaptchaShape(client, message, langdata, "reply", false, "premiumBuy")

            }
        }
    }
};

export default panel;
