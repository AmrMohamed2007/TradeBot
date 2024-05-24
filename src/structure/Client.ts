const { GiveawaysManager } =  require("../Tools/discord-giveaways/index.js")
import * as Discord from "discord.js"
import * as config from "../config.json"
import User from "../Database/user";
import Server from "../Database/server";
import AllShapes from "../security"
import { giveawayModel } from "../Database/giveaway"
import type {
    Client,
    Snowflake
} from 'discord.js';
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
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



class GiveawayManagerWithOwnDatabase {
    constructor(client:Client, options) {
        new GiveawaysManager(client, options)
    }
    // This function is called when the manager needs to get all giveaways which are stored in the database.
    async getAllGiveaways(): Promise<any> {
        // Get all giveaways from the database. We fetch all documents by passing an empty condition.
        return await giveawayModel.find().lean().exec();
    }

    // This function is called when a giveaway needs to be saved in the database.
    async saveGiveaway(messageId:Snowflake, giveawayData): Promise<boolean>{
        // Add the new giveaway to the database
        await giveawayModel.create(giveawayData);
        // Don't forget to return something!
        return true
    }

    // This function is called when a giveaway needs to be edited in the database.
    async editGiveaway(messageId:Snowflake, giveawayData) {
        // Find by messageId and update it
        await giveawayModel.updateOne({ messageId }, giveawayData).exec();
        // Don't forget to return something!
        return true
    }

    // This function is called when a giveaway needs to be deleted from the database.
    async deleteGiveaway(messageId:Snowflake): Promise<boolean> {
        // Find by messageId and delete it
        await giveawayModel.deleteOne({ messageId }).exec();
        // Don't forget to return something!
        return true;
    }
};
// Create a new instance of your new class
const manager = new GiveawayManagerWithOwnDatabase(client, {
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});

client.giveawaysManager = manager;

// Some Functions

client.functions = {};
client.captcha = {};
client.premium = {};
client.shapes = AllShapes;
client.public = {};
// Export Client

export default client;
