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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const emoji_regex_1 = __importDefault(require("emoji-regex"));
const LanguageCommaned = {
    name: "set",
    description: "Setup the bot with this command",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "language",
            description: "Setup guild's language",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: []
        },
        {
            name: "giveaway",
            description: "Setup guild's giveaway settings",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "color_start",
                    description: "embed color while making giveaway",
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: "color_end",
                    description: "embed color while ending giveaway",
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: "image",
                    description: "embed image while starting giveaway",
                    type: discord_js_1.ApplicationCommandOptionType.Attachment,
                    required: false
                },
                {
                    name: "thumbnail",
                    description: "giveaway thumbnail while starting giveaway",
                    type: discord_js_1.ApplicationCommandOptionType.Attachment,
                    required: false
                },
                {
                    name: "reaction",
                    description: "giveaway reaction while starting giveaway",
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: false
                },
            ]
        },
    ],
    botPerms: ["AddReactions", "SendMessages"],
    userPerms: ["ManageGuild"],
    cooldown: 20000,
    run: (client, interaction, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        const subcommand = interaction.options.getSubcommand();
        try {
            if (subcommand == "language") {
                client.emit("languageUpdate", interaction, langdata);
            }
            if (subcommand == "giveaway") {
                const ArrOptions = interaction.options.data[0].options;
                const Handled = {};
                yield ArrOptions.forEach((option) => __awaiter(void 0, void 0, void 0, function* () {
                    if (option.type == 3) {
                        if (option.name.startsWith("color")) {
                            const color = yield (0, discord_js_1.resolveColor)(option.value);
                            if (!color)
                                return;
                            Handled[option.name] = `${option.value}`;
                        }
                        else {
                            var emoji = client.emojis.cache.get(option.value);
                            if (!emoji) {
                                const emojiDefault = yield (0, emoji_regex_1.default)().test(option.value);
                                if (emojiDefault) {
                                    Handled[option.name] = option.value;
                                }
                                else
                                    return;
                                ;
                            }
                            else {
                                Handled[option.name] = `<:${emoji.name}:${emoji.id}>`;
                            }
                        }
                    }
                    if (option.type == 11) {
                        Handled[option.name] = option.attachment.url;
                    }
                }));
                const arrOfData = Object.keys(Handled);
                if (arrOfData.length == 0)
                    return yield interaction.reply({ content: `${langdata.error}`, ephemeral: true });
                else {
                    client.functions.get.GetUser(client.schemas, { key: "guildid", value: interaction.guild.id, status: "one" }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                        arrOfData.forEach((key) => {
                            res[key] = Handled[key];
                        });
                        yield res.save();
                        yield interaction.reply({ content: `${client.config.emojis.true} ${langdata.setupdone}` });
                    })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                        console.log(err);
                        yield interaction.reply({ content: `${langdata.error}`, ephemeral: true });
                    }));
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
