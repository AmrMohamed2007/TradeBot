

import { ActionRowBuilder, Client, Interaction, StringSelectMenuBuilder } from "discord.js"
const Event = {
    name: "languageUpdate",
    once: false,
    run: async (client: Client, interaction: any, langdata: any) => {
        await client.functions.get.GetUser(client.schemas, { status: "one", key: "guildid", value: interaction.guild.id }).then(async (res) => {
            if (res && res.blacklisted.bool) {

                await client.guilds.cache.get(interaction.guild.id)?.leave();
               
            } else {
                const selectmenu = new StringSelectMenuBuilder()
                .setCustomId("languageset")
                .setPlaceholder(`${langdata.language.placeholder}`)
                .setOptions(...client.config.langs)
                const row = new ActionRowBuilder<StringSelectMenuBuilder>()
                .setComponents(selectmenu)

                const Msg = await interaction.reply({components:[row]})

                const collecter = interaction.channel.createMessageComponentCollector({filter:u => u.user.id == interaction.user.id,max:1,time:10000})

                collecter.on("collect" , async col => {
                    if(col.customId == "languageset") {
                        const lang = col.values[0]
                        if(lang == res.lang) {
                            await Msg.delete();
                        }else {
                            res.lang = lang;
                            await res.save()
                            await client.SetLang(client,interaction.guild.id,lang)
                            await Msg.edit({content:`${client.config.emojis.true} ${langdata.language.done}`,components:[]})
                        }
                        
                    }
                })
            }
        })


    }
}

export default Event;