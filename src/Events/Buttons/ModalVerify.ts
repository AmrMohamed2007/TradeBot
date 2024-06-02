import { ButtonInteraction, Interaction, ModalSubmitInteraction } from "discord.js"
import ms from "ms"

import { Client } from "discord.js"
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: ModalSubmitInteraction) => {
        if (interaction.isModalSubmit() && interaction.customId == "verifymodalgmail") {
            const langdata = await client.GetLang(client, interaction.guild.id)
            const code = interaction.fields.getTextInputValue("code")
            
            const Msg = await interaction.reply({ embeds: [await client.waitembed({ color: client.config.wrongcolor, description: `**${client.config.emojis.loading} ${langdata.captcha.waiting}**`, thing: "Proccessing.." })], ephemeral: true })

            await client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: interaction.user.id}).then(async (res) => {
                try {
                    if(res.verified) {
                        await Msg.edit({embeds:[],content:`${client.config.emojis.false} ${langdata.components.createAccount.verified}`})
                    }else {
                        if(String(res.code) == String(code)) {
                            if((Date.now() - res.sendAt) >= ms('1h')) {
                                await client.schema.deleteOne({userid:interaction.user.id});
                                await interaction.message.delete()
                                await Msg.edit({embeds:[],content:`${client.config.emojis.false} ${langdata.components.createAccount.errtime}`})
    
                            }else {
                                res.verified = true;
                                res.code = undefined
                                res.sendAt = undefined
                                await res.save();
                                await interaction.message.delete()
                                await Msg.edit({embeds:[],content:`${client.config.emojis.true} ${langdata.private.createdacc}`})
                         
                            }
                           
                        }else {
                            await Msg.edit({embeds:[],content:`${client.config.emojis.false} ${langdata.components.createAccount.codeerr}`})

                        }
    
                    }
                  



                } catch (error) {
                

                    await Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}\n\`\`\`${error.message}\`\`\``, embeds: [] })

                }
            }).catch(async (err) => {
        

                await Msg.edit({ content: `${client.config.emojis.false} ${langdata.captcha[err.message]}`, embeds: [] })



            })
        }



    }
}

export default Event;