import { Client, CommandInteraction, User, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";

const terra = {
    name: "terra",
    description: "show your book of terra",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "balance",
            description: "show your balance of terra",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "user", description: "show book of terra for user", type: 6, required: false }
            ],
        },
        {
            name: "transfer",
            description: "transfer terra to user",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "give",
            description: "give terra to user",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "userid", description: "type userid", required: true, type: 3 },
                { name: "count", description: "count of terra", required: true, type: 10 }
            ]
        },
        {
            name: "remove",
            description: "remove terra from user",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "userid", description: "type userid", required: true, type: 3 },
                { name: "count", description: "count of terra", required: true, type: 10 }
            ]
        },
        {
            name: "givecard",
            description: "give terra to user",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "userid", description: "type userid", required: true, type: 3 },
                { name: "count", description: "count of terra", required: true, type: 10 }
            ]
        },
        {
            name: "removecard",
            description: "remove terra from user",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "userid", description: "type userid", required: true, type: 3 },
                { name: "count", description: "count of terra", required: true, type: 10 }
            ]
        },
    ],
    cooldown: 10000,
    databaseActions: ["blacklist", "scummer"],
    botPerms: ["AddReactions", "SendMessages"],
    run: async (client: Client, message: any, langdata: any) => {

        const sub = message.options.getSubcommand()
        const args = message.options.get("user") ? message.options.get("user")?.user : message.user
        async function ReturnData(user: User) {


            await client.functions.get.GetUser(client.schema, { key: "userid", value: user.id, status: "one" }).then(async (res) => {



                const embed = await client.CreateEmbed({
                    title: langdata.private.titleuser, fields: [
                        { value: `${user.id}`, name: `${langdata.private.userid}`, inline: true },
                        { value: `${user.id == message.user.id ? res.coins : res.secured ? `${client.config.emojis.passwordver.repeat(4)}` : res.coins}`, name: `${langdata.private.coins}`, inline: true },
                    ],
                    color: client.config.maincolor,


                })
                message.reply({ embeds: [embed], ephemeral: true })

            }).catch(async (err) => {
                await message.reply({ content: `${client.config.emojis.false} ${langdata.captcha[err.message]}` })
            })
        }
        if (sub == "balance") {
            if (args) {


                var user = args
                if (user.bot) return;
                await ReturnData(user)

            }
        }
        if (sub == "transfer") {
            await client.captcha.CaptchaShape(client, message, langdata, "reply", false, "terraTransfer")
        }

        if (sub == "give") {
            if(!client.config.owners.includes(message.user.id)) return;
            const userid = message.options.getString("userid")
            const count = message.options.getNumber("count")
            client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: userid })
                .then(async (res) => {
                    res.coins = res.coins + count
                    await res.save()
                    await message.reply({content:`**Done Added to ${message.user.id}\nCount : ${count == 0 || count > res.coins ? "all" : count}**`,ephemeral:true})
                }).catch((err) => {
                    message.reply({ content: "User doesn't have a account",ephemeral:true })
                })

        }

        if (sub == "remove") {
            if(!client.config.owners.includes(message.user.id)) return;
            const userid = message.options.getString("userid")
            const count = message.options.getNumber("count")
            client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: userid })
                .then(async (res) => {
                    res.coins = res.coins < count || count == 0 ? 0 : res.coins - count;
                    await res.save()
                    await message.reply({content:`**Done Removed from ${message.user.id}\nCount : ${count == 0 || count > res.coins ? "all" : count}**`,ephemeral:true})
                }).catch((err) => {
                    message.reply({ content: "User doesn't have a account",ephemeral:true })
                })

        }
    }
}

export default terra;