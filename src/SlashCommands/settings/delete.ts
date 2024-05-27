import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction, parseEmoji, PartialEmoji, resolveColor } from "discord.js"

const LanguageCommaned = {
    name: "delete",
    description: "delete giveaway image or thumbnail",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "image",
            description: "delete image giveaway",
            type: ApplicationCommandOptionType.Subcommand,
            options: []
        },
        {
            name: "thumbnail",
            description: "delete thumbnail giveaway",
            type: ApplicationCommandOptionType.Subcommand,
            options: []
        },





    ],
    userPerms: ["ManageGuild"],
    cooldown: 20000,
    run: async (client: Client, interaction: any, langdata: any) => {
        const subcommand = interaction.options.getSubcommand()
        try {
          
              


            
                
               
                    client.functions.get.GetUser(client.schemas, { key: "guildid", value: interaction.guild.id, status: "one" }).then(async (res) => {
                        if(!res[subcommand]) 
                            return await interaction.reply({content:`**${client.config.emojis.false} ${langdata.errorr.deleteno}**`,ephemeral:true})
                        res[subcommand] = undefined
                        await res.save()
                        await interaction.reply({ content: `**${langdata.donedeleted.replace("[emoji]",client.config.emojis.true)}**` })
                    }).catch(async (err) => {
                        console.log(err);
                        
                        await interaction.reply({ content: `${client.config.emojis.false} ${langdata.error}`, ephemeral: true })
                    })
                
              






             

        } catch (error) {
            console.log(error);
            
            await interaction.reply({ content: `${error.message}`, ephemeral: true })
        }
    }
}

export default LanguageCommaned;