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
const gend = {
    name: "gend",
    description: "End Giveaway .",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    cooldown: 1000,
    options: [
        {
            name: "message_id",
            description: "Enter MessageId of giveaway",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    userPerms: ["ManageGuild"],
    botPerms: ["AddReactions", "SendMessages"],
    run: (client, interaction, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        const messageId = interaction.options.getString("message_id");
        client.giveawaysManager
            .end(messageId)
            .then(() => {
            interaction.reply(`${langdata.giveaway.endmsg.replace("[emoji]", client.config.emojis.true)}`);
        })
            .catch((err) => {
            interaction;
            interaction
                .reply({
                content: `${langdata.giveaway.error.replace("[emoji]", client.config.emojis.false)}`,
                ephemeral: true,
            })
                .catch((err) => {
                err = 0;
            });
        });
    }),
};
exports.default = gend;
