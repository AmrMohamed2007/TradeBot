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
const Event = {
    name: "languageUpdate",
    once: false,
    run: (client, interaction, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.functions.get.GetUser(client.schemas, { status: "one", key: "guildid", value: interaction.guild.id }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (res && res.blacklisted.bool) {
                yield ((_a = client.guilds.cache.get(interaction.guild.id)) === null || _a === void 0 ? void 0 : _a.leave());
            }
            else {
                const selectmenu = new discord_js_1.StringSelectMenuBuilder()
                    .setCustomId("languageset")
                    .setPlaceholder(`${langdata.language.placeholder}`)
                    .setOptions(...client.config.langs);
                const row = new discord_js_1.ActionRowBuilder()
                    .setComponents(selectmenu);
                const Msg = yield interaction.reply({ components: [row] });
                const collecter = interaction.channel.createMessageComponentCollector({ filter: u => u.user.id == interaction.user.id, max: 1, time: 10000 });
                collecter.on("collect", (col) => __awaiter(void 0, void 0, void 0, function* () {
                    if (col.customId == "languageset") {
                        const lang = col.values[0];
                        if (lang == res.lang) {
                            yield Msg.delete();
                        }
                        else {
                            res.lang = lang;
                            yield res.save();
                            yield client.SetLang(client, interaction.guild.id, lang);
                            yield Msg.edit({ content: `${client.config.emojis.true} ${langdata.language.done}`, components: [] });
                        }
                    }
                }));
            }
        }));
    })
};
exports.default = Event;
