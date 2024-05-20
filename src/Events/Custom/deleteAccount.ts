import { ButtonInteraction, Interaction, ModalSubmitInteraction } from "discord.js"

import ms from "ms"
import pretty from "pretty-ms"
import { Client } from "discord.js"

const Event = {
    name: "deleteAccount",
    once: false,
    run: async (client: Client, interaction: any, langdata: any) => {
        const Msg = await interaction.reply({ embeds: [await client.waitembed({ color: client.config.wrongcolor, thing: "processing...", description: `${langdata.captcha.waiting}` })], ephemeral: true })
        await client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: interaction.user.id }).then(async (res) => {
            if(res && res.blacklisted) {
                const embed = await client.CreateEmbed({
                    description: `${langdata.error}`,
                    color: client.config.wrongcolor,
                })
                Msg.edit({ embeds: [embed], ephemeral: true })
            }else if(res && res.scummer) {
                const embed = await client.CreateEmbed({
                    description: `${langdata.error}`,
                    color: client.config.wrongcolor,
                })
                Msg.edit({ embeds: [embed], ephemeral: true })
            }else {
                await client.schema.deleteOne({userid:interaction.user.id})
                const embed = await client.CreateEmbed({
                    description: `${langdata.private.donedelete}`,
                    color: client.config.maincolor,
                })
                Msg.edit({ embeds: [embed], ephemeral: true })
            
            }







        }).catch(async (err) => {
            console.log(err);

            const embed = await client.CreateEmbed({
                description: `${langdata.captcha[err.message]}`,
                color: client.config.wrongcolor,
            })
            Msg.edit({ embeds: [embed], ephemeral: true })


        })


    }
}

async function setDaily(res: any, NumberOfCoins: number) {
    res.coins = res.coins + NumberOfCoins
    res.daily = { taken: true, takenAt: Date.now() }


    await res.save()
}

export default Event;