import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, Interaction, ModalSubmitInteraction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "premiumBuy",
    once: false,
    run: async (client: Client, interaction: ButtonInteraction, langdata: any) => {
        const Msg = await interaction.reply({ embeds: [await client.waitembed({ color: client.config.wrongcolor, thing: "processing...", description: `${langdata.captcha.waiting}` })], ephemeral: true })
        await client.functions.get.GetUser(client.schema, { key: "userid", value: interaction.user.id, status: "one" }).then(async (res) => {
            if (res.blacklisted.bool || res.scummer.bool)
                return await Msg.edit({ content: `${langdata.error}`, embeds: [] })

                if(res && !res.verified) {
                    const embed = await client.CreateEmbed({
                        description: `${client.config.emojis.false} ${langdata.captcha.errornoacc}`,
                        color: client.config.wrongcolor,
                    })
                    return await interaction.reply({ embeds: [embed], ephemeral: true })
                }
         
                if (res.premium.bool)
                await Msg.edit({ content: `${langdata.premium.errorhavepremium}`, embeds: [] })
            const Data = { name: interaction.guild.name, iconURL: interaction.guild.iconURL() }
            const embed = await client.CreateEmbed({
                title: `${langdata.premium.titlebuy}`,
                description:"**25% Sale for Premium Users**",
                fields: [
                    { name: `${langdata.premium.month}`, value: `${client.config.time[0].price} Terra(s)\n2.99$`, inline: true },
                    { name: `${langdata.premium.year}`, value: `${client.config.time[1].price} Terra(s)\n19.99$`, inline: true },
                ],
                author: Data,
                footer: Data,
                color: client.config.maincolor

            })

            const row = new ActionRowBuilder<ButtonBuilder>()

            const btn1 = new ButtonBuilder()
                .setCustomId("premiumbuy_1")
                .setStyle(ButtonStyle.Secondary)
                .setLabel(`${langdata.premium.month}`)
                .setEmoji(client.config.emojis.logo)

            const btn2 = new ButtonBuilder()
                .setCustomId("premiumbuy_12")
                .setStyle(ButtonStyle.Success)
                .setLabel(`${langdata.premium.year}`)
                .setEmoji(client.config.emojis.logo)

            row.setComponents(btn1, btn2);

            await Msg.edit({ embeds: [embed], components: [row] })

            const collecter = interaction.channel.createMessageComponentCollector({filter:u => u.user.id == interaction.user.id,max:1,time:16000})
            collecter.on("collect" ,async col => {
                const TypeTrail = +col.customId.split("_")[1] * 30
                    const price = client.config.time.find((m) => m.time == col.customId.split("_")[1]).price
                   const fullprice = price - (Math.floor((price * 25) / 100))
                    if(res.premium.subscribed) {
                        if(res.coins < fullprice)
                        return await col.reply({content:`${client.config.emojis.false} ${langdata.captcha.errorcoinsenough}`,ephemeral:true})
    
                        res.coins = res.coins - fullprice
                        res.premium.subscribed = true;
                        res.premium.days =  res.premium.days + TypeTrail
                        await res.save();
                       await col.reply({content:`${langdata.done.replace("[emoji]",client.config.emojis.true)}`,ephemeral:true}).then(async () => {
                            await Msg.delete()
                         })
                         await client.Log.LogPremiumUser({
                            user:res.userid,
                            code:res.premium.code,
                            days:TypeTrail,

                         },langdata,client)
                    }else {
                        if(res.coins < price)
                        return await interaction.reply({content:`${client.config.emojis.false} ${langdata.captcha.errorcoinsenough}`,ephemeral:true})
                        res.coins = res.coins - price
                        res.premium.subscribed = true;
                        res.premium.createdAt = Date.now()
                        res.premium.days = TypeTrail
                        res.premium.code = await client.public.generateRandomCode()
                        await res.save();
                        await col.reply({content:`${langdata.done.replace("[emoji]",client.config.emojis.true)}`,ephemeral:true}).then(async () => {
                            await Msg.delete()
                         })
                         await client.Log.LogPremiumUser({
                            user:res.userid,
                            code:res.premium.code,
                            days:TypeTrail,
                            
                         },langdata,client)
                       
                    }
                    
             
            })

        


        }).catch(async (err) => {
            console.log(err);

            await Msg.edit({ content: `${langdata.error}`, embeds: [] })
        })
    }
}

export default Event;