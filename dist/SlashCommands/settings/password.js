"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const LanguageCommaned = {
    name: "password",
    description: "Setup the bot with command",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "set",
            description: "Set password for your account",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: []
        },
    ],
    cooldown: 20000,
    botPerms: ["AddReactions", "SendMessages"],
    run: (client, interaction, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        const subcommand = interaction.options.getSubcommand();
        if (subcommand == "set") {
            client.emit("passwordUpdate", interaction, langdata);
        }
        if (subcommand == "forget") {
            client.emit("passwordforget", interaction, langdata);
        }
    })
};
exports.default = LanguageCommaned;
