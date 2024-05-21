import { ButtonInteraction, ButtonBuilder, Interaction, ActionRow, ActionRowBuilder } from "discord.js"

import { Client } from "discord.js"
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: ButtonInteraction) => {
        if (interaction.isButton() && interaction.customId.startsWith("leave_")) {

            if(!client.config.owners.includes(interaction.user.id)) return;
            await Leave(client, interaction, 1);

        }
        if (interaction.isButton() && interaction.customId.startsWith("blacklist_")) {
            if(!client.config.owners.includes(interaction.user.id)) return;
            const type = interaction.customId.split("_")[1]
            const id = interaction.customId.split("_")[2]
            client.functions.get.GetUser(type == "user" ? client.schema : client.schemas, { status: "one", key: type == "user" ? "userid" : "guildid", value: id,create:true}).then(async (res) => {
         
               
                if (type == "server" && res.blacklisted) {
                    res.blacklisted = true
                    await res.save();
                    await Leave(client, interaction, 1)
                }
                if (type == "server" && !res.blacklisted) {
                    res.blacklisted = true
                    await res.save();
                    await Leave(client, interaction, 1)
                }

                if (type == "user" && res.blacklisted) {
                    await Edit(interaction)

                }
                if (type == "user" && !res.blacklisted) {
                    res.blacklisted = true
                    await res.save();
                    await Edit(interaction)
                }
            }).catch((err) => {
                console.log(err);
                
            })
        

        }



    }
}

async function Edit(interaction) {
    await interaction.deferUpdate()
    const Components = interaction.message.components as any
    var comp = ButtonBuilder.from(interaction.component) as any
    Components.pop(comp);

    const editedButton = comp
        .setDisabled(true);

    Components.unshift(editedButton)

    const row = new ActionRowBuilder<ButtonBuilder>()
        .setComponents(...Components)
    await interaction.message.edit({ components: [row] })
}
async function Leave(client, interaction, index) {

    const id = interaction.customId.split("_")[index]


    var gg = await client.guilds.cache.get(id)


    await Edit(interaction)
    if (gg) {
      
        await gg.leave();



        client.emit("GuildDelete", client.guilds.cache.get(id))


    }
}
export default Event;