import * as Discord  from "discord.js"
const config = require("../config.json")
import User from "../Database/user";
import Server from "../Database/server";
import AllShapes from "../security"


const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers,
    ]
})

// Config

client.config = config;
client.prefix = config.prefix

// Collections

client.schema = User;
client.schemas = Server;
client.commands = new Discord.Collection()
client.slashCommands = new Discord.Collection()
client.events = new Discord.Collection()
client.aliases = new Discord.Collection()
client.cooldown = new Discord.Collection()
client.langdata = new Discord.Collection()

// Some Functions

client.functions = {}
client.captcha = {}
client.premium = {}
client.shapes = AllShapes;
client.public = {}
// Export Client

export default client;
