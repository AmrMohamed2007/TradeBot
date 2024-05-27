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
        }
    ],
    cooldown:10000,
    databaseActions:["blacklist","scummer"],
    botPerms:["AddReactions","SendMessages"],
    run: async (client: Client, message: any, langdata: any) => {

        const sub = message.options.getSubcommand()
        const args = message.options.get("user") ? message.options.get("user")?.user : message.user
        async function ReturnData(user: User) {


            await client.functions.get.GetUser(client.schema, { key: "userid", value: user.id, status: "one" }).then(async (res) => {


                if (!res.password) {
                    const embed = await client.CreateEmbed({
                        title: langdata.private.titleuser, fields: [
                            { value: `${user.id}`, name: `${langdata.private.userid}`, inline: true },
                            { value: `${res.secured ? `${client.config.emojis.passwordver.repeat(4)}` : res.coins}`, name: `${langdata.private.coins}`, inline: true },
                        ],
                        color: client.config.maincolor,


                    })
                    message.reply({ embeds: [embed] })
                }
                if (res.password) {
                    if (user.id !== message.user.id) {
                        const embed = await client.CreateEmbed({
                            title: langdata.private.titleuser, fields: [
                                { value: `${user.id}`, name: `${langdata.private.userid}`, inline: true },
                                { value: `${client.config.emojis.passwordver.repeat(4)}`, name: `${langdata.private.coins}`, inline: true },
                            ],
                            color: client.config.maincolor,


                        })
                        message.reply({ embeds: [embed] })
                    } else {


                        await client.captcha.CaptchaReact(client, message, langdata, "terraShow")
                    }

                }





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
            await client.captcha.CaptchaShape(client,message,langdata,"reply",false,"terraTransfer")

           

        }

    }
}

export default terra;