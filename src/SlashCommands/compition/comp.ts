import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from "discord.js"
const Ping = {
    name: "competition",
    description: "manage competition with users",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "start", description: "start a competition", type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "type", description: "type of this comp", required: true, type: 3, choices: [
                        { name: "images", value: "images" },
                        { name: "text", value: "text" }
                    ]
                }
            ]
        },
        { name: "end", description: "end a competition", type: ApplicationCommandOptionType.Subcommand },
        { name: "pause", description: "pause a competition", type: ApplicationCommandOptionType.Subcommand },
        { name: "unpause", description: "unpause a competition", type: ApplicationCommandOptionType.Subcommand },

    ],
    run: async (client: any, interaction: any, langdata: any) => {
        const sub = interaction.options.getSubcommand()
        const type = interaction.options.getString("type")
        await client.functions.get.GetUser(client.schemas, { status: "one", key: "guildid", value: interaction.guild.id }).then(async (res) => {
            
            const data = await client.public.GeneratePanelComp(client, type, { guildid: interaction.guild, title_comp: res.title_comp, desc_comp: res.desc_comp, image: res.image_comp, thumbnail: res.thumbnail_comp })
            await interaction.reply({content:`${client.config.emojis.true} ${langdata.setupdone}`,ephemeral:true})
            await interaction.channel.send({embeds:[data.embad],components:[data.row]})
            
        }).catch((err) => {

        })




    }
}

export default Ping;