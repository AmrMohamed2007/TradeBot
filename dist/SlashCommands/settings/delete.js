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
    name: "delete",
    description: "delete giveaway image or thumbnail",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "image",
            description: "delete image giveaway",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: []
        },
        {
            name: "thumbnail",
            description: "delete thumbnail giveaway",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: []
        },
        {
            name: "user",
            description: "delete user data",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "id", description: "id", required: true, type: 3 }
            ]
        },
        {
            name: "server",
            description: "delete server data",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "id", description: "id", required: true, type: 3 }
            ]
        },
    ],
    userPerms: ["ManageGuild"],
    cooldown: 20000,
    botPerms: ["AddReactions", "SendMessages"],
    run: (client, interaction, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        const subcommand = interaction.options.getSubcommand();
        try {
            if (subcommand !== "user" || subcommand !== "server") {
                client.functions.get.GetUser(client.schemas, { key: "guildid", value: interaction.guild.id, status: "one" }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!res[subcommand])
                        return yield interaction.reply({ content: `**${client.config.emojis.false} ${langdata.errorr.deleteno}**`, ephemeral: true });
                    res[subcommand] = undefined;
                    yield res.save();
                    yield interaction.reply({ content: `**${langdata.donedeleted.replace("[emoji]", client.config.emojis.true)}**` });
                })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                    console.log(err);
                    yield interaction.reply({ content: `${client.config.emojis.false} ${langdata.error}`, ephemeral: true });
                }));
            }
            else {
                if (!client.config.owners.includes(interaction.user.id))
                    return;
                if (subcommand == "user") {
                    const userid = interaction.options.getString("id");
                    yield client.functions.delete.Delete(client.schema, { key: "userid", value: userid });
                    yield interaction.reply({ content: "**Done !**" });
                }
                if (subcommand == "server") {
                    const userid = interaction.options.getString("id");
                    yield client.functions.delete.Delete(client.schemas, { key: "guildid", value: userid });
                    yield interaction.reply({ content: "**Done !**" });
                }
            }
        }
        catch (error) {
            console.log(error);
            yield interaction.reply({ content: `${error.message}`, ephemeral: true });
        }
    })
};
exports.default = LanguageCommaned;
