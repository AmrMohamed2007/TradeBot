import {PermissionsBitField} from "discord.js"
import * as ms from "ms"
import { WrongEmbed } from "../../Tools/Embeds";
import {Client} from "discord.js"
const Event = {
    name: "messageCreate",
    once: false,
    run: async (client: Client, message: any) => {
        if(message.author.bot || !message.content) 
        return;

        if(message.channel.type !== 0) 
        return;

        const {cooldown,prefix,commands,aliases,GetLang} = client as any;
        
        
        if(!prefix || !message.content.startsWith(prefix))
         return;
        
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        
        const cmd = args.shift().toLowerCase()
        
        if(!cmd || cmd.length == 0)
         return;

         var Command = commands.get(cmd)

         if(!Command)
         Command = commands.get(aliases.get(cmd));

         if(!Command)
         return;    
        
        
         var {author,reply} = message
        var LangData = await GetLang(client,message.guild.id)
      
        
        var MemberClient = message.guild.members.cache.get(client.user.id);

     
        // CoolDown Handel 
        if(Command.cooldown) {
            if(cooldown.has(`${Command.name}${author.id}`))
            return reply({content:`${LangData.cooldown.message.replace("<duration>",ms(cooldown.get(`${Command.name}${author.id}`) - Date.now(), {long : true}))}`})
            
            if(Command.owner && !client.config.owners.includes(author.id))
            return reply({content:`${LangData.owner.message}`});

            if(Command.ownership && author.id !== message.guild.ownerId) {
                return reply({content:`${LangData.ownership.message}`});

            }


            if(Command.botPerms || Command.userPerms) {
                if(!MemberClient.permission.has(PermissionsBitField.resolve(Command.botPerms || [])))
                return reply({embeds:[await WrongEmbed({title:"Missing Permission",description:LangData.error.permissionme,color:client.config.maincolor})]});

                if(!message.member.permission.has(PermissionsBitField.resolve(Command.userPerms || [])))
                return reply({embeds:[await WrongEmbed({title:"Missing Permission",description:LangData.error.permission,color:client.config.maincolor})]});



            }
            Command.run(client, message, args,LangData)
            cooldown.set(`${Command.name}${message.author.id}`, Date.now() + Command.cooldown)
            setTimeout(() => {
                cooldown.delete(`${Command.name}${message.author.id}`)
            }, Command.cooldown);

            
        }
        // If Dont have cooldown
        else {
  
            if(Command.owner && !client.config.owners.includes(author.id))
            return reply({content:`${LangData.owner.message}`});

            if(Command.ownership && author.id !== message.guild.ownerId) {
                return reply({content:`${LangData.ownership.message}`});

            }

            if(Command.botPerms || Command.userPerms) {
                if(!MemberClient.permission.has(PermissionsBitField.resolve(Command.botPerms || [])))
                return reply({embeds:[await WrongEmbed({title:"Missing Permission",description:LangData.error.permissionme,color:client.config.maincolor})]});

                if(!message.member.permission.has(PermissionsBitField.resolve(Command.userPerms || [])))
                return reply({embeds:[await WrongEmbed({title:"Missing Permission",description:LangData.error.permission,color:client.config.maincolor})]});



            }
            Command.run(client, message, args,LangData)



        }


    }
}

export default Event;