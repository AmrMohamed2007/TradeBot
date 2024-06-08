"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const config = __importStar(require("../config.json"));
const user_1 = __importDefault(require("../Database/user"));
const server_1 = __importDefault(require("../Database/server"));
const cupon_1 = __importDefault(require("../Database/cupon"));
const security_1 = __importDefault(require("../security"));
const giveaway_1 = require("../Database/giveaway");
const Giveaway_1 = require("./Giveaway");
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessageReactions,
    ]
});
client.config = config;
client.prefix = config.prefix;
client.cupon = cupon_1.default;
client.schema = user_1.default;
client.schemas = server_1.default;
client.schemaGiveaway = giveaway_1.giveawayModel;
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.events = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldown = new Discord.Collection();
client.langdata = new Discord.Collection();
process.on("uncaughtException", err => {
    console.log(err);
});
process.on("uncaughtExceptionMonitor", err => {
    console.log(err);
});
process.on("unhandledRejection", (err) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(err, "e");
}));
client.setMaxListeners(100);
client.functions = {};
client.captcha = {};
client.premium = {};
client.shapes = security_1.default;
client.public = {};
client.functions.manger = Giveaway_1.GiveawayStartup;
client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (interaction.isButton()) {
        interaction.channel.awaitMessages({
            "errors": ["time"],
            "max": 1,
            filter: u => u.author.id == interaction.user.id
        }).then((s) => __awaiter(void 0, void 0, void 0, function* () {
            yield interaction.channel.send({ content: "a7a" });
        })).catch((err) => {
            console.log(err);
        });
    }
}));
exports.default = client;
