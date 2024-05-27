import { CommandInteraction, GuildMember, GuildMemberFlags, Interaction, PermissionsBitField } from "discord.js"
import { WrongEmbed } from "../../Tools/Embeds";
import { Client } from "discord.js"
import prettyMilliseconds from "pretty-ms";
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: any) => {
        const slashCommand = client.slashCommands.get(interaction.commandName) as any
        if (!slashCommand)
            return client.slashCommands.delete(interaction.commandName);

        if (interaction.type !== 2) return;

        var { cooldown, GetLang } = client as any;
        var LangData = await GetLang(client, interaction.guild.id)
        var MemberClient = interaction.guild.members.cache.get(client.user.id) as any


        async function RunSlashHandle(client: Client) {

            var { user } = interaction


            if (slashCommand.cooldown) {
                if (cooldown.has(`${slashCommand.name}${user.id}`))
                    return await interaction.reply({ content: `${LangData.cooldown.message.replace("<duration>", prettyMilliseconds(cooldown.get(`${slashCommand.name}${user.id}`) - Date.now()))}`, ephemeral: true })

                if (slashCommand.owner && !client.config.owners.includes(user.id))
                    return await interaction.reply({ content: `${LangData.owner.message}`, ephemeral: true });

                if (slashCommand.ownership && interaction.user.id !== interaction.guild.ownerId)
                    return await interaction.reply({ content: `${LangData.ownership.message}`, ephemeral: true });

                if (slashCommand.botPerms || slashCommand.userPerms) {
                    if (!MemberClient.permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || [])))
                        return await interaction.reply({ embeds: [await WrongEmbed({ title: "Missing Permission", description: LangData.permissionme, color: client.config.maincolor })], ephemeral: true });

                    if (!interaction.member.permissions.has(PermissionsBitField.resolve(slashCommand.userPerms || [])))
                        return await interaction.reply({ embeds: [await WrongEmbed({ title: "Missing Permission", description: LangData.permission, color: client.config.maincolor })], ephemeral: true });



                }
                slashCommand.run(client, interaction, LangData)
                cooldown.set(`${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown)
                setTimeout(() => {
                    cooldown.delete(`${slashCommand.name}${user.id}`)
                }, slashCommand.cooldown);

            }
            else {

                if (slashCommand.owner && !client.config.owners.includes(user.id))
                    return await interaction.reply({ content: `${LangData.owner.message}`, ephemeral: true });


                if (slashCommand.ownership && interaction.user.id !== interaction.guild.ownerId)
                    return await interaction.reply({ content: `${LangData.ownership.message}`, ephemeral: true });



                if (slashCommand.botPerms || slashCommand.userPerms) {
                    if (!MemberClient.permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || [])))
                        return await interaction.reply({ embeds: [await WrongEmbed({ title: "Missing Permission", description: LangData.permissionme, color: client.config.maincolor })], ephemeral: true });

                    if (!interaction.member.permissions.has(PermissionsBitField.resolve(slashCommand.userPerms || [])))
                        return await interaction.reply({ embeds: [await WrongEmbed({ title: "Missing Permission", description: LangData.permission, color: client.config.maincolor })], ephemeral: true });



                }
                slashCommand.run(client, interaction, LangData)



            }


        }

        if (slashCommand.databaseActions) {

            await client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: `${interaction.user.id}` }).then(async (res) => {




                if (slashCommand.databaseActions.includes("blacklist") && res.blacklisted.bool) {
                    if (cooldown.has(`${slashCommand.name}${interaction.user.id}`))
                        return await interaction.reply({ content: `${LangData.cooldown.message.replace("<duration>", prettyMilliseconds(cooldown.get(`${slashCommand.name}${interaction.user.id}`) - Date.now()))}`, ephemeral: true })

                    cooldown.set(`${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown)
                    setTimeout(() => {
                        cooldown.delete(`${slashCommand.name}${interaction.user.id}`)
                    }, slashCommand.cooldown);

                    return await interaction.reply({ content: `${LangData.private.blacklistedmsg}`, ephemeral: true })

                }
                else if (slashCommand.databaseActions.includes("scummer") && res.scummer.bool) {
                    if (cooldown.has(`${slashCommand.name}${interaction.user.id}`))
                        return await interaction.reply({ content: `${LangData.cooldown.message.replace("<duration>", prettyMilliseconds(cooldown.get(`${slashCommand.name}${interaction.user.id}`) - Date.now()))}`, ephemeral: true })

                    cooldown.set(`${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown)
                    setTimeout(() => {
                        cooldown.delete(`${slashCommand.name}${interaction.user.id}`)
                    }, slashCommand.cooldown);

                    return await interaction.reply({ content: `${LangData.private.scummermsg}`, ephemeral: true })
                }
                else if (slashCommand.databaseActions.includes("premium") && !res.premium.subscribed) {


                    if (cooldown.has(`${slashCommand.name}${interaction.user.id}`))
                        return await interaction.reply({ content: `${LangData.cooldown.message.replace("<duration>", prettyMilliseconds(cooldown.get(`${slashCommand.name}${interaction.user.id}`) - Date.now()))}`, ephemeral: true })

                    cooldown.set(`${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown)
                    setTimeout(() => {
                        cooldown.delete(`${slashCommand.name}${interaction.user.id}`)
                    }, slashCommand.cooldown);

                    return await interaction.reply({ content: `${LangData.premium.nopre}`, ephemeral: true })
                }

                else {
                    RunSlashHandle(client)
                }
            }).catch(async (err) => {
                return await interaction.reply({ content: `${LangData.captcha.errornoacc}`, ephemeral: true })
            })
        } else {
            return await RunSlashHandle(client);
        }





    }
}

export default Event;