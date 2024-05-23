import { ButtonInteraction, Interaction, ModalSubmitInteraction } from "discord.js"

import ms from "ms"
import pretty from "pretty-ms"
import { Client } from "discord.js"

const Event = {
    name: "dailyAccount",
    once: false,
    run: async (client: Client, interaction: any, langdata: any) => {
        const Msg = await interaction.reply({ embeds: [await client.waitembed({ color: client.config.wrongcolor, thing: "processing...", description: `${langdata.captcha.waiting}` })], ephemeral: true })
        await client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: interaction.user.id }).then(async (res) => {
            const NumberOfCoins = Math.floor(Math.random() * 10 + 1);
            if(res && res.blacklisted.bool) {
             
                
                const embed = await client.CreateEmbed({
                    description: `${langdata.error}`,
                    color: client.config.wrongcolor,
                })
                Msg.edit({ embeds: [embed], ephemeral: true })
            }else if(res && res.scummer.bool) {
            
                
                const embed = await client.CreateEmbed({
                    description: `${langdata.error}`,
                    color: client.config.wrongcolor,
                })
                Msg.edit({ embeds: [embed], ephemeral: true })
            }else {
            const { daily } = res as any;
            if (!daily || !daily.taken) {
                await setDaily(res, NumberOfCoins)
                const embed = await client.CreateEmbed({
                    description: `${langdata.private.dailytaken}`,
                    color: client.config.maincolor,
                })
                Msg.edit({ embeds: [embed], ephemeral: true })

            }
            else if (daily.taken && (Date.now() - daily.takenAt) >= ms("24h")) {
                await setDaily(res, NumberOfCoins);
                const embed = await client.CreateEmbed({
                    description: `${langdata.private.dailytaken}`,
                    color: client.config.maincolor,
                })
                Msg.edit({ embeds: [embed], ephemeral: true })

            } else {


                const time = await pretty(
                    +Math.floor(
                        ms("24h") - (Date.now() - daily.takenAt)
                    ))

                const embed = await client.CreateEmbed({
                    description: `${langdata.private.wait.replace("[time]", `${time}`)}`,
                    color: client.config.wrongcolor,
                })
                Msg.edit({ embeds: [embed], ephemeral: true })

            }




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