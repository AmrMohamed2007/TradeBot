
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

// Some Functionsdate({"content":"asd"})

client.functions = {};
client.captcha = {};
client.premium = {};
client.shapes = AllShapes;
client.public = {};
client.functions.manger = GiveawayStartup;

client.on("interactionCreate", async interaction  => {
    if(interaction.isButton()) {
   
    
      interaction.channel.awaitMessages({
        "errors":["time"],
        "max":1,
       filter: u=> u.author.id == interaction.user.id
    }).then(async (s) => {
        await interaction.channel.send({content:"a7a"})
    }).catch((err) => {
        console.log(err);
        
    })
        
    } 
  
})
export default client;
