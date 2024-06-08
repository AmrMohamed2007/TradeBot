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
function SetupScummer(client, type, langdata, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const row = new discord_js_1.ActionRowBuilder();
        const addScummer = new discord_js_1.ButtonBuilder()
            .setLabel(langdata.scammer.labeladd)
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setEmoji(client.config.emojis.true)
            .setCustomId(`addscammer_${type}_${message.user.id}`);
        const findScummer = new discord_js_1.ButtonBuilder()
            .setLabel(langdata.scammer.findScummer)
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setEmoji(client.config.emojis.warning)
            .setCustomId(`findscammer_${type}_${message.user.id}`);
        const deleteScummer = new discord_js_1.ButtonBuilder()
            .setLabel(langdata.scammer.deleteScummer)
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setEmoji(client.config.emojis.false)
            .setCustomId(`deletescammer_${type}_${message.user.id}`);
        row.setComponents(addScummer, findScummer, deleteScummer);
        if (type == "user") {
            var dataAuthor = { name: message.guild.name, iconURL: message.guild.iconURL() };
            const Embed = yield client.CreateEmbed({
                title: langdata.scammer.title,
                description: langdata.scammer.desc,
                author: dataAuthor,
                footer: dataAuthor,
                color: client.config.maincolor
            });
            yield message.reply({ content: `**${langdata.setupdone} ${client.config.emojis.true}**`, ephemeral: true });
            yield message.channel.send({ embeds: [Embed], components: [row] });
        }
        if (type == "owner") {
            var dataAuthor = { name: message.guild.name, iconURL: message.guild.iconURL() };
            const Embed = yield client.CreateEmbed({
                title: langdata.scammer.title,
                description: langdata.scammer.desc,
                author: dataAuthor,
                footer: dataAuthor,
                image: client.config.info.scammers,
                color: client.config.maincolor,
            });
            yield message.reply({ content: `**${langdata.setupdone} ${client.config.emojis.true}**`, ephemeral: true });
            yield message.channel.send({ embeds: [Embed], components: [row] });
        }
    });
}
exports.default = { SetupScummer };
