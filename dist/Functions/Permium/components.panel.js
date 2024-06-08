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
function ComponentsPanel(client, type, langdata, guildid) {
    return __awaiter(this, void 0, void 0, function* () {
        const createAccount = new discord_js_1.ButtonBuilder()
            .setCustomId(`acc_createAccount_${type}`)
            .setStyle(discord_js_1.ButtonStyle.Success)
            .setLabel(`${langdata.premium.createbtn}`)
            .setEmoji(`${client.config.emojis.true}`);
        const dailyAccount = new discord_js_1.ButtonBuilder()
            .setCustomId(`acc_dailyAccount_${type}`)
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setLabel(`${langdata.premium.dailybtn}`)
            .setEmoji(`${client.config.emojis.daily}`);
        const transferAccount = new discord_js_1.ButtonBuilder()
            .setCustomId(`acc_transferAccount_${type}`)
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setLabel(`${langdata.premium.transferbtn}`)
            .setEmoji(`${client.config.emojis.transfer}`);
        const ReportAccount = new discord_js_1.ButtonBuilder()
            .setCustomId(`acc_reportAccount_${type}`)
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setLabel(`${langdata.premium.reportbtn}`)
            .setEmoji(`${client.config.emojis.report}`);
        function arrayRotate(arr) {
            arr = [ReportAccount, transferAccount, dailyAccount, createAccount];
            return arr;
        }
        var ArrayOfButtons = [createAccount, dailyAccount, transferAccount, ReportAccount];
        if (type == "user") {
            const lang = client.langdata.get(guildid);
            if (lang == "ar")
                ArrayOfButtons = yield arrayRotate(ArrayOfButtons);
            const row = new discord_js_1.ActionRowBuilder()
                .setComponents(ArrayOfButtons);
            return row;
        }
        if (type == "owner") {
            const lang = client.langdata.get(guildid);
            if (lang == "ar")
                ArrayOfButtons = yield arrayRotate(ArrayOfButtons);
            const row = new discord_js_1.ActionRowBuilder()
                .setComponents(ArrayOfButtons);
            return row;
        }
    });
}
exports.default = { ComponentsPanel };
