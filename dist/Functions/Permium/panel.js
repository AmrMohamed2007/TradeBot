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
function SetupPanel(client, type, langdata, message) {
    return __awaiter(this, void 0, void 0, function* () {
        if (type == "user") {
            var dataAuthor = { name: message.guild.name, iconURL: message.guild.iconURL() };
            const Embed = yield client.CreateEmbed({
                title: langdata.premium.titlepanel,
                description: langdata.premium.descpanel,
                author: dataAuthor,
                footer: dataAuthor,
                color: client.config.maincolor,
                thumbnail: message.guild.iconURL()
            });
            const row = yield client.premium.ComponentsPanel(client, type, langdata, message.guild.id);
            yield message.reply({ content: `${langdata.setupdone} ${client.config.emojis.true}`, ephemeral: true });
            yield message.channel.send({ embeds: [Embed], components: [row] });
        }
        if (type == "owner") {
            var dataAuthor = { name: message.guild.name, iconURL: message.guild.iconURL() };
            const Embed = yield client.CreateEmbed({
                title: langdata.premium.titlepanel,
                description: langdata.premium.descpanel,
                author: dataAuthor,
                footer: dataAuthor,
                color: client.config.maincolor,
                image: client.config.info.panel,
                thumbnail: message.guild.iconURL()
            });
            const row = yield client.premium.ComponentsPanel(client, type, langdata, message.guild.id);
            yield message.reply({ content: `${langdata.setupdone} ${client.config.emojis.true}`, ephemeral: true });
            yield message.channel.send({ embeds: [Embed], components: [row] });
        }
    });
}
exports.default = { SetupPanel };
