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
const discord_js_2 = require("discord.js");
function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
}
function ReturnShapesC(client, guildid) {
    return __awaiter(this, void 0, void 0, function* () {
        const row1 = new discord_js_2.ActionRowBuilder();
        const row2 = new discord_js_2.ActionRowBuilder();
        const row3 = new discord_js_2.ActionRowBuilder();
        const lang = yield client.langdata.get(guildid);
        var shapes = client.shapes[lang].shapes;
        yield shuffle(shapes);
        const Arr = [];
        for (let i = 0; i < shapes.length; i++) {
            const element = shapes[i];
            if (i <= 2) {
                row1.addComponents(new discord_js_2.ButtonBuilder()
                    .setEmoji(element.emoji)
                    .setStyle(discord_js_1.ButtonStyle.Secondary)
                    .setCustomId(`captchashape_${element.emoji}`));
            }
            else if (i <= 5 && i > 2) {
                row2.addComponents(new discord_js_2.ButtonBuilder()
                    .setEmoji(element.emoji)
                    .setStyle(discord_js_1.ButtonStyle.Secondary)
                    .setCustomId(`captchashape_${element.emoji}`));
            }
            else {
                row3.addComponents(new discord_js_2.ButtonBuilder()
                    .setEmoji(element.emoji)
                    .setStyle(discord_js_1.ButtonStyle.Secondary)
                    .setCustomId(`captchashape_${element.emoji}`));
            }
        }
        Arr.push(row1, row2, row3);
        return Arr;
    });
}
exports.default = { ReturnShapesC };
