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
const Ping = {
    name: "help",
    description: "Comamnd for show all commands",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    run: (client, interaction, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        const author = {
            name: interaction.guild.name,
            iconURL: interaction.guild.iconURL()
        };
        const embed = yield client.CreateEmbed({
            title: `${langdata.help.title}`,
            description: `${langdata.help.description}`,
            color: client.config.maincolor,
            author,
            footer: author,
            thumbnail: author.iconURL
        });
        const row = new discord_js_1.ActionRowBuilder();
        const rowSelect = new discord_js_1.ActionRowBuilder();
        const rowSupport = new discord_js_1.ActionRowBuilder();
        const btn1 = new discord_js_1.ButtonBuilder()
            .setLabel("Support")
            .setStyle(discord_js_1.ButtonStyle.Link)
            .setURL(client.config.serverURL)
            .setEmoji(client.config.emojis.support);
        rowSupport.setComponents(btn1);
        const BankBtn = new discord_js_1.ButtonBuilder()
            .setCustomId("bankcommands")
            .setStyle(discord_js_1.ButtonStyle.Success)
            .setEmoji(client.config.emojis.daily);
        const GiveawayBtn = new discord_js_1.ButtonBuilder()
            .setCustomId("giveawycommands")
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setEmoji(client.config.emojis.giveaway);
        const SettingsBtn = new discord_js_1.ButtonBuilder()
            .setCustomId("settingscommands")
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setEmoji(client.config.emojis.settings);
        row.setComponents(BankBtn, GiveawayBtn, SettingsBtn);
        const stringSelect = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId("helpselect")
            .setOptions(...langdata.questions.help)
            .setPlaceholder(`${langdata.help.placeholderques}`);
        rowSelect.setComponents(stringSelect);
        const Msg = yield interaction.reply({ embeds: [embed], components: [row, rowSelect, rowSupport] });
        const collecter = yield interaction.channel.createMessageComponentCollector({ filter: u => u.user.id == interaction.user.id });
        collecter.on("collect", (col) => __awaiter(void 0, void 0, void 0, function* () {
            if (col.isButton()) {
                if (col.customId == "bankcommands") {
                    const embed = yield client.CreateEmbed({
                        title: `${client.config.emojis.daily} Bank Commands`,
                        description: `
                        **/terra balance**: Show your balance of terra\n
                       **/terra transfer** : Transfer terra to users\n
                       ** /account **: Show your bank account info`,
                        color: client.config.maincolor,
                        thumbnail: interaction.guild.iconURL(),
                        author: { name: interaction.guild.name, iconURL: interaction.guild.iconURL() },
                        footer: { name: interaction.guild.name, iconURL: interaction.guild.iconURL() },
                    });
                    yield col.deferUpdate();
                    yield Msg.edit({ embeds: [embed] });
                }
                if (col.customId == "giveawycommands") {
                    const embed = yield client.CreateEmbed({
                        title: `${client.config.emojis.giveaway} Giveaway Commands`,
                        description: `
                        **/gstart**: Start giveawy or multi giveaways\n
                       **/gdelete** : Delete giveaway from channel and cancel it\n
                       **/greroll **: Reroll a giveaway\n
                       **/gpause** : Puase a giveaway\n
                       **/gresume** : Resume a giveaway\n
                       **gend** : End a giveaway`,
                        color: client.config.maincolor,
                        thumbnail: interaction.guild.iconURL(),
                        author: { name: interaction.guild.name, iconURL: interaction.guild.iconURL() },
                        footer: { name: interaction.guild.name, iconURL: interaction.guild.iconURL() },
                    });
                    yield col.deferUpdate();
                    yield Msg.edit({ embeds: [embed] });
                }
                if (col.customId == "settingscommands") {
                    const embed = yield client.CreateEmbed({
                        title: `${client.config.emojis.settings} Settings Commands`,
                        description: `
                        **/toggle privatemode**: enable/disable private mode makes users dont show your balance\n
                       **/password set** : set password for your account\n
                       **/set giveaway**: makes you edit anything in giveaway\n
                       **/delete image** : delete giveaway's image\n
                       **/delete thumbnail** : delete giveaway's thumbnail`,
                        color: client.config.maincolor,
                        thumbnail: interaction.guild.iconURL(),
                        author: { name: interaction.guild.name, iconURL: interaction.guild.iconURL() },
                        footer: { name: interaction.guild.name, iconURL: interaction.guild.iconURL() },
                    });
                    yield col.deferUpdate();
                    yield Msg.edit({ embeds: [embed] });
                }
            }
            if (col.isStringSelectMenu()) {
                if (col.customId == "helpselect") {
                    const value = col.values[0];
                    const answers = langdata.answers.help;
                    const answer = answers.find((m) => m.value == value).label;
                    yield col.reply({ content: `${langdata.questions.help.find(m => m.value == value).label}\n\n${answer}`, ephemeral: true });
                }
            }
        }));
    })
};
exports.default = Ping;
