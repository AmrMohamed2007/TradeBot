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
exports.WaitingEmbed = exports.WrongEmbed = exports.CreateEmbd = void 0;
const discord_js_1 = require("discord.js");
function CreateEmbd(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var Embed = new discord_js_1.EmbedBuilder();
        Embed.setTitle(data.title ? data.title : null);
        Embed.setDescription(data.description ? data.description : null);
        Embed.setColor(data.color ? data.color : data.maincolor);
        Embed.setTimestamp();
        if (data.author) {
            Embed.setAuthor({ name: data.author.name, iconURL: data.author.iconURL });
        }
        if (data.footer) {
            Embed.setFooter({ text: data.footer.name, iconURL: data.footer.iconURL });
        }
        if (data.fields) {
            Embed.setFields(...data.fields);
        }
        if (data.thumbnail) {
            Embed.setThumbnail(data.thumbnail);
        }
        Embed.setImage(data.image ? data.image : null);
        return Embed;
    });
}
exports.CreateEmbd = CreateEmbd;
function WrongEmbed(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var Embed = new discord_js_1.EmbedBuilder();
        Embed.setTitle(data.title ? data.title : null);
        Embed.setDescription(data.description.replace("<permission>", data.permission));
        Embed.setColor("Red");
        Embed.setTimestamp();
        return Embed;
    });
}
exports.WrongEmbed = WrongEmbed;
function WaitingEmbed(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var Embed = new discord_js_1.EmbedBuilder();
        Embed.setDescription(data.description.replace("<thing>", data.thing));
        Embed.setColor(data.color);
        return Embed;
    });
}
exports.WaitingEmbed = WaitingEmbed;
