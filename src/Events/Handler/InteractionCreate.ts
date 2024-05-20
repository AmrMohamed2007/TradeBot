import {PermissionsBitField} from "discord.js"
import * as ms from "ms"
import { WrongEmbed } from "../../Tools/Embeds";
import {Client} from "discord.js"
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: any) => {
     const slashCommand  = client.slashCommands.get(interaction.commandName) as any
     if(!slashCommand)
      return client.slashCommands.delete(interaction.commandName);
    
      var {user,reply} = interaction
      var {cooldown,GetLang} = client as any;
      var LangData = await GetLang(client,interaction.guild.id)

      var MemberClient = interaction.guild.members.cache.get(client.user.id);
      if(interaction.type !== 2) return;
      if(slashCommand.cooldown) {
        if(cooldown.has(`${slashCommand.name}${user.id}`))
        return reply({content:`${LangData.cooldown.message.replace("<duration>",ms(cooldown.get(`${slashCommand.name}${user.id}`) - Date.now(), {long : true}))}`})
        
        if(slashCommand.owner && !client.config.owners.includes(user.id))
        return reply({content:`${LangData.owner.message}`});

        if(slashCommand.ownership && interaction.user.id !== interaction.guild.ownerId)
        return reply({content:`${LangData.ownership.message}`});

        if(slashCommand.botPerms || slashCommand.userPerms) {
            if(!MemberClient.permission.has(PermissionsBitField.resolve(slashCommand.botPerms || [])))
            return reply({embeds:[await WrongEmbed({title:"Missing Permission",description:LangData.error.permissionme,color:client.config.maincolor})]});

            if(!interaction.member.permission.has(PermissionsBitField.resolve(slashCommand.userPerms || [])))
            return reply({embeds:[await WrongEmbed({title:"Missing Permission",description:LangData.error.permission,color:client.config.maincolor})]});



        }
        slashCommand.run(client, interaction,LangData)
        cooldown.set(`${slashCommand.name}${interaction.author.id}`, Date.now() + slashCommand.cooldown)
        setTimeout(() => {
            cooldown.delete(`${slashCommand.name}${user.id}`)
        }, slashCommand.cooldown);

        
    }
    // If Dont have cooldown
    else {

        if(slashCommand.owner && !client.config.owners.includes(user.id))
        return reply({content:`${LangData.owner.message}`});


        if(slashCommand.ownership && interaction.user.id !== interaction.guild.ownerId)
        return reply({content:`${LangData.ownership.message}`});



        if(slashCommand.botPerms || slashCommand.userPerms) {
            if(!MemberClient.permission.has(PermissionsBitField.resolve(slashCommand.botPerms || [])))
            return reply({embeds:[await WrongEmbed({title:"Missing Permission",description:LangData.error.permissionme,color:client.config.maincolor})]});

            if(!interaction.member.permission.has(PermissionsBitField.resolve(slashCommand.userPerms || [])))
            return reply({embeds:[await WrongEmbed({title:"Missing Permission",description:LangData.error.permission,color:client.config.maincolor})]});



        }
        slashCommand.run(client, interaction,LangData)



    }
     



    }
}

export default Event;