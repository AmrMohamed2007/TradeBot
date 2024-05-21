import { Client, CommandInteraction, User, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import prettyMilliseconds from 'pretty-ms';

const panel = {
    name: "prime",
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
        }
    ],
    run: async (client: Client, message: any, langdata: any) => {
        const userType = client.config.owners.includes(message.user.id) ? "owner" : "user";
        const subcommand = message.options.getSubcommand();

        async function returnData(user: User, type: string) {
            if (type === "owner") {
                await client.premium.SetupPanel(client, type, langdata, message);
            } else {
                try {
                    const res = await client.functions.get.GetUser(client.schema, { key: "userid", value: user.id, status: "one" });
                    if (!res.premium || !res.premium.subscribed) {
                        return await message.reply({ content: `${langdata.premium.nopre}` });
                    }
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
                await returnData(user, userType);
            } else if (subcommand === "info") {
                try {
                    const res = await client.functions.get.GetUser(client.schema, { key: "userid", value: message.user.id, status: "one" });
                    if (!res.premium || !res.premium.subscribed) {
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
                        footer: { text: message.guild.name, iconURL: message.guild.iconURL() }
                    });

                    await message.reply({ embeds: [embed] });
                } catch (err) {
                    return await message.reply({ content: `${langdata.captcha[err.message]}` });
                }
            }
        }
    }
};

export default panel;
