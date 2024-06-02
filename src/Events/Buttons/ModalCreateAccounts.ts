import { ButtonInteraction, Interaction, ModalSubmitInteraction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: ModalSubmitInteraction) => {
        if (interaction.isModalSubmit() && interaction.customId.startsWith("createAccountmodal_")) {
            const type = interaction.customId.split("_")[1]
            const langdata = await client.GetLang(client, interaction.guild.id)
            const password = type == "password" ? interaction.fields.getTextInputValue("transfertmodalpassword") : null
            const lastname = interaction.fields.getTextInputValue("textlastname")
            const firstname = interaction.fields.getTextInputValue("textfirstname")
            const gmail = interaction.fields.getTextInputValue("textgmail")
            const Msg = await interaction.reply({ embeds: [await client.waitembed({ color: client.config.wrongcolor, description: `**${client.config.emojis.loading} ${langdata.captcha.waiting}**`, thing: "Sending.." })], ephemeral: true })
            const accountCreationDate = interaction.user.createdAt;
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            if (accountCreationDate > oneMonthAgo) {
                await Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}` })
            }else {

         
            await client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: interaction.user.id, create: true }).then(async (res) => {
                try {
                    if(res.verified) {
                        await Msg.edit({embeds:[],content:`${client.config.emojis.false} ${langdata.components.createAccount.verified}`})

                    }else {
                        
                
                    if (res.password) {
                        if (res.password !== password) {
                            await Msg.edit({ content: `${client.config.emojis.false} ${langdata.captcha.errorpassword}` })
                        } else {
                            await client.captcha.SendMail(client, gmail, langdata, res, { firstname, lastname, gmail }, client.types.CreateNewAccount).then(async () => {
                                await Msg.edit({ content: `**${client.config.emojis.true} ${langdata.components.createAccount.senddone}**`, embeds: [], components: [await client.public.ButtonVerfy(client, langdata)] })
                            }).catch(async (err) => {
                             

                                await Msg.edit({ content: `${client.config.emojis.false} ${err}`, embeds: [] })

                            })
                        }
                    } else {


                        await client.captcha.SendMail(client, gmail, langdata, res, { firstname, lastname, gmail }, client.types.CreateNewAccount).then(async () => {
                            await Msg.edit({ content: `**${client.config.emojis.true} ${langdata.components.createAccount.senddone}**`, embeds: [], components: [await client.public.ButtonVerfy(client, langdata)] })
                        }).catch(async (err) => {
                        

                            await Msg.edit({ content: `${client.config.emojis.false} ${err}`, embeds: [] })

                        })
                    }



                }

                } catch (error) {
                
                    console.log(error);
                    
                    await Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}\n\`\`\`${error.message}\`\`\``, embeds: [] })

                }
            }).catch(async (err) => {
        

                await Msg.edit({ content: `${client.config.emojis.false} ${langdata.captcha[err.message]}`, embeds: [] })



            })
        }
        }



    }
}

export default Event;