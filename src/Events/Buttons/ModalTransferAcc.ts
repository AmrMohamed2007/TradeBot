import { Interaction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: Interaction) => {
        if (interaction.isModalSubmit() && interaction.customId == "transferaccountmodal") {
            const langdata = await client.GetLang(client, interaction.guild.id)
            const userid = interaction.fields.getTextInputValue("useridtransfermodal")
            client.functions.get.GetUser(client.schema, { status: "all" }).then(async (res) => {
                const MainPerson = res.find((m) => m.userid == interaction.user.id);
                const SecondMainPerson = res.find((m) => m.userid == userid);
                if (!SecondMainPerson) {
                    const createdData = new client.schema({
                        userid,
                        coins: MainPerson?.coins,
                        premium: MainPerson?.premium,
                        daily: MainPerson?.daily,
                        blacklisted: MainPerson?.blacklisted,
                        log: MainPerson?.log,
                        secured: MainPerson?.secured,
                        password: MainPerson?.password
                    })
                    await client.schema.deleteOne({ userid: MainPerson.userid })
                    await createdData.save();
                    await interaction.reply({ content: `${client.config.emojis.true} ${langdata.premium.donetransferacc}`, ephemeral: true })
                } else {
                    await interaction.reply({ content: `${client.config.emojis.false} ${langdata.premium.haveacctransfer}`, ephemeral: true })
                }
            })
        }



    }
}

export default Event;