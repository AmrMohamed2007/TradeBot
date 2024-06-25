import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction } from "discord.js"
import ms from "ms"
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
                },
                {
                    name: "duration", description: "duration of this comp", required: true, type: 3
                },
            ]
        },

        {
            name: "setup", description: "setup a competition", type: ApplicationCommandOptionType.Subcommand,

        }

    ],
    userPerms: ["Administrator"],
    run: async (client: Client, interaction: any, langdata: any) => {
        const sub = interaction.options.getSubcommand()
        const type = interaction.options.getString("type")
        const duration = interaction.options.getString("duration")
        if (sub == "start") {


            if (!ms(duration))
                return await interaction.reply({ content: `${langdata.giveaway.timeerror}`, ephemeral: true })
            await interaction.deferReply({ ephemeral: true })
            await client.functions.get.GetUser(client.schemas, { status: "one", key: "guildid", value: interaction.guild.id, create: true }).then(async (res) => {
                if (!res.comp_channel_joiners || !res.comp_channel_mosabka)
                    return await interaction.followUp({ content: `${client.config.emojis.false} ${langdata.comp.panel.errorchannels}` });
                const ChannelJoiners = await interaction.guild.channels.cache.get(res.comp_channel_joiners)
                const ChannelMosabka = await interaction.guild.channels.cache.get(res.comp_channel_mosabka)

                if (!ChannelJoiners || !ChannelMosabka) {
                    if (!ChannelMosabka) {
                        res.comp_channel_mosabka = undefined

                    }
                    if (!ChannelJoiners) {
                        res.comp_channel_joiners = undefined
                    }

                    await res.save()
                    return await interaction.followUp({ content: `${client.config.emojis.false} ${langdata.comp.panel.errorchannels}` });
                }
                await client.functions.get.GetUser(client.comp, { key: "guildid", value: interaction.guild.id, status: "one" }).then(async (ress) => {

                    await interaction.followUp({ content: `${client.config.emojis.false} ${langdata.comp.panel.compalready}`, ephemeral: true })


                }).catch(async (err) => {
                    const data = await client.public.GeneratePanelComp(client, type, { guildid: interaction.guild, title_comp: res.title_comp, desc_comp: res.desc_comp, image: res.image_comp, thumbnail: res.thumbnail_comp,compstatus:"running" })

                    const Msg = await ChannelMosabka.send({ embeds: [data.embad], components: [data.row,data.row1] })
                    const news = new client.comp({
                        hostedby: interaction.user.id,
                        createdAt: Date.now(),
                        endAt: ms(duration),
                        messageId: Msg.id,
                        comptype: type,
                        compstatus: "running",
                        users: [],
                        guildid: interaction.guildId,
                        channel: ChannelMosabka.id
                    })
                    await news.save()
                    await interaction.followUp({ content: `${client.config.emojis.true} ${langdata.setupdone}`, ephemeral: true })


                })
            }).catch(async (err) => {
                console.log(err);

                return await interaction.followUp({ content: `${client.config.emojis.false} ${langdata.error}` });

            })

        }

        if(sub == "setup") {
            await client.functions.get.GetUser(client.schemas,{key:"guildid",value:interaction.guild.id,status:"one",create:true}).then(async (res) => {
                const fields = [
                    {name:`${langdata.setup.react}`,value:`${res.react_comp ? res.react_comp : client.config.emojis.true}`,inline:true},
                    {name:`${langdata.setup.channelJoiners}`,value:`${res.comp_channel_joiners ? res.comp_channel_joiners : langdata.private.no}`,inline:true},
                    {name:`${langdata.setup.channelMosabka}`,value:`${res.comp_channel_mosabka ? res.comp_channel_mosabka : langdata.private.no}`,inline:true},
                    {name:`${langdata.setup.thumbnail}`,value:`${res.thumbnail_comp ? res.thumbnail_comp : langdata.private.no}`,inline:true},
                    {name:`${langdata.setup.image}`,value:`${res.image_comp ? res.image_comp : langdata.private.no}`,inline:true}
                ]
                const DataMsg= await client.public.GeneratePanelCompSetup(client,{fields,guild:interaction.guild,thumbnail:res.thumbnail_comp,image:res.image_comp},langdata)
                

                await interaction.reply(DataMsg)
            }).catch(async (err) => {

                await interaction.reply({content:`${langdata.error}`,ephemeral:true})
            })
        }


    }
}

export default Ping;