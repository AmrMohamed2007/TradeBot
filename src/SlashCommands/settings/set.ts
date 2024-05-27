import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction, parseEmoji, PartialEmoji, resolveColor } from "discord.js"
import emojiRegex from 'emoji-regex';

const LanguageCommaned = {
    name: "set",
    description: "Setup the bot with this command",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "language",
            description: "Setup guild's language",
            type: ApplicationCommandOptionType.Subcommand,
            options: []
        },
        {
            name: "giveaway",
            description: "Setup guild's giveaway settings",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "color_start",
                    description: "embed color while making giveaway",
                    type: ApplicationCommandOptionType.String,
                    required: false

                },

                {
                    name: "color_end",
                    description: "embed color while ending giveaway",
                    type: ApplicationCommandOptionType.String,
                    required: false

                },


                {
                    name: "image",
                    description: "embed image while starting giveaway",
                    type: ApplicationCommandOptionType.Attachment,
                    required: false

                },

                {
                    name: "thumbnail",
                    description: "giveaway thumbnail while starting giveaway",
                    type: ApplicationCommandOptionType.Attachment,
                    required: false

                },

                {
                    name: "reaction",
                    description: "giveaway reaction while starting giveaway",
                    type: ApplicationCommandOptionType.String,
                    required: false

                },
            ]
        },





    ],
    userPerms: ["ManageGuild"],
    cooldown: 20000,
    run: async (client: Client, interaction: any, langdata: any) => {
        const subcommand = interaction.options.getSubcommand()
        try {
            if (subcommand == "language") {
                client.emit("languageUpdate", interaction, langdata)
            }
            if (subcommand == "giveaway") {
                const ArrOptions = interaction.options.data[0].options
                const Handled = {};



              await  ArrOptions.forEach(async (option) => {
                    if (option.type == 3) {
                        if (option.name.startsWith("color")) {
                            const color = await resolveColor(option.value)
                            if (!color) return;
                            Handled[option.name] = `${option.value}`;
                        } else {
                            var emoji = client.emojis.cache.get(option.value)
                            
                            if (!emoji) {
                                const emojiDefault = await emojiRegex().test(option.value)
                                if(emojiDefault) {
                                
                                    
                                Handled[option.name] = option.value;
                                }else return;
                                ;
                            }else {
                              
                                
                                Handled[option.name] = `<:${emoji.name}:${emoji.id}>`;
                            }
                           
                        }
                    }
                    if (option.type == 11) {
                        Handled[option.name] = option.attachment.url

                    }
                })

                const arrOfData =  Object.keys(Handled)
            
                
                if (arrOfData.length == 0)
                    return await interaction.reply({ content: `${langdata.error}`, ephemeral: true });
                else {
                    client.functions.get.GetUser(client.schemas, { key: "guildid", value: interaction.guild.id, status: "one" }).then(async (res) => {
                        arrOfData.forEach((key) => {
                            res[key] = Handled[key];
                        })
                        await res.save()
                        await interaction.reply({ content: `${client.config.emojis.true} ${langdata.setupdone}` })
                    }).catch(async (err) => {
                        console.log(err);
                        
                        await interaction.reply({ content: `${langdata.error}`, ephemeral: true })
                    })
                }
              





            }



        } catch (error) {
            console.log(error);
            
            await interaction.reply({ content: `${error.message}`, ephemeral: true })
        }
    }
}

export default LanguageCommaned;