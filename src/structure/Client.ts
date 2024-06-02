
import * as Discord from "discord.js"
import * as config from "../config.json"
import User from "../Database/user";
import Server from "../Database/server";
import AllShapes from "../security"
import { giveawayModel } from "../Database/giveaway"
import { GiveawayStartup } from "./Giveaway";
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessageReactions,
    ]
})

// Config

client.config = config;
client.prefix = config.prefix;

// Collections

client.schema = User;
client.schemas = Server;
client.schemaGiveaway = giveawayModel;
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.events = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldown = new Discord.Collection();
client.langdata = new Discord.Collection();


process.on("uncaughtException" , err => {
    console.log(err);
    
})
process.on("uncaughtExceptionMonitor" , err => {
    console.log(err);
    
})
process.on("unhandledRejection", async err => {
    console.log(err,"e");
    
})

client.setMaxListeners(100)

// Some Functions

client.functions = {};
client.captcha = {};
client.premium = {};
client.shapes = AllShapes;
client.public = {};
client.functions.manger = GiveawayStartup;

// Export Client
client.on("interactionCreate" , async Interaction => {
   
  
  
    const botid = "1080816952789962802"
    const bankid = "283091738069958660"
    const collector =  Interaction.channel.createMessageCollector({
        filter: m => m.author.id == botid && m.content.includes(Interaction.user.id) && m.content.includes(bankid) && m.content.startsWith(`**<:Frame50:1240761305313574992> <@${bankid}>`),
        max: 1,
        time: 1000 * 60 * 2,
        
    });

    collector.on("collect" , async col => {
        await collector.stop("Stopped")
        await col.channel.send({content:"so sexy"})
    })
    
})
export default client;
