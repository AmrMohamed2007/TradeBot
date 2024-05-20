import { Client, CommandInteraction, User, ApplicationCommandType } from "discord.js";

const terra = {
    name: "terra",
    description: "show your book of terra",
    type: ApplicationCommandType.ChatInput,
    options: [
        { name: "user", description: "show book of terra for user", type: 6, required: false }
    ],
    run: async (client: Client, message: CommandInteraction, langdata: any) => {

        const args = message.options.get("user") ?  message.options.get("user")?.user : message.user
        async function ReturnData(user: User) {
            

            await client.functions.get.GetUser(client.schema, { key: "userid", value: user.id, status: "one" }).then(async (res) => {


                if (!res.password) {
                    const embed = await client.CreateEmbed({
                        title: langdata.private.titleuser, fields: [
                            { value: `${user.id}`, name: `${langdata.private.userid}`, inline: true },
                            { value: `${res.secured ? `\*\*\*\*\*` : res.coins}`, name: `${langdata.private.coins}`, inline: true },
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
                                { value: `\*\*\*\*\*`, name: `${langdata.private.coins}`, inline: true },
                            ],
                            color: client.config.maincolor,


                        })
                        message.reply({ embeds: [embed] })
                    } else {


                        await client.captcha.CaptchaReact(client, message, langdata,"terraShow")
                    }

                }





            }).catch(async (err) => {
          


                await message.reply({ content: `${langdata.captcha[err.message]}` })
            })


        }

        if (args) {
           
            
            var user = args
            if(user.bot) return;
            await ReturnData(user)

        }
    }
}

export default terra;