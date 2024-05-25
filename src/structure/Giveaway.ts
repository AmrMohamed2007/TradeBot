import { Client } from "discord.js"
import type {
    Snowflake
} from 'discord.js';
const { GiveawaysManager ,GiveawaysManagerOptions} = require("../Tools/discord-giveaways/index.js")
async function GiveawayStartup(client: Client, data: any) {
    var giveawayModel = client.schemaGiveaway
    const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {

        public constructor(client: Client, options:any) {
            super(client, options)
            this.client = client;
            this.options = options
            return this;
        }
        options: any
        client: Client
        async getAllGiveaways(): Promise<any> {
            return await giveawayModel.find().lean().exec();
        }

        async saveGiveaway(messageId: Snowflake, giveawayData): Promise<boolean> {
            await giveawayModel.create(giveawayData);
            return true
        }

        async editGiveaway(messageId: Snowflake, giveawayData) {
            await giveawayModel.updateOne({ messageId }, giveawayData).exec().then(() => {
                return true
            }).catch((err) => {
                return false;
            })
        }

        async deleteGiveaway(messageId: Snowflake): Promise<boolean> {
            await giveawayModel.deleteOne({ messageId }).exec();
            return true;
        }
    };
    const manager = new GiveawayManagerWithOwnDatabase(client, {
        default: {
            botsCanWin: false,
            embedColor: "#aa2e2e",
            embedColorEnd: "#aa2e2e",
            reaction: "<:6556:1243622173386608801>"
        }
    }); 
    
  
  return manager;




}
export { GiveawayStartup };