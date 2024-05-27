
import pretty from "pretty-ms"
import { Client } from "discord.js"

const Event = {
    name: "transferAccount",
    once: false,
    run: async (client: Client, interaction: any, langdata: any) => {
        await client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: interaction.user.id }).then(async (res) => {
           
            if(res && res.blacklisted.bool) {
             
                
                const embed = await client.CreateEmbed({
                    description: `${client.config.emojis.false} ${langdata.error}`,
                    color: client.config.wrongcolor,
                })
                return interaction.reply({ embeds: [embed], ephemeral: true })
            }else if(res && res.scummer.bool) {
            
                
                const embed = await client.CreateEmbed({
                    description: `${client.config.emojis.false} ${langdata.error}`,
                    color: client.config.wrongcolor,
                })
                return interaction.reply({ embeds: [embed], ephemeral: true })
            }else {
           
            if (!res.premium || !res.premium.subscribed) {
                const embed = await client.CreateEmbed({
                    description: `${client.config.emojis.false} ${langdata.premium.nopre}`,
                    color: client.config.wrongcolor,
                })
                return interaction.reply({ embeds: [embed], ephemeral: true })
            } else {
                
                await interaction.showModal(await client.premium.TransferModal(langdata));
            }

        }




        }).catch(async (err) => {
            console.log(err);

            const embed = await client.CreateEmbed({
                description: `${langdata.captcha[err.message]}`,
                color: client.config.wrongcolor,
            })
            interaction.reply({ embeds: [embed], ephemeral: true })


        })


    }
}



export default Event;