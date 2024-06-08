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
const Event = {
    name: "interactionCreate",
    once: false,
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (interaction.isButton() && interaction.customId.startsWith("addscammer_")) {
            const langdata = yield client.GetLang(client, interaction.guild.id);
            yield client.functions.get.GetUser(client.schemas, { status: "one", key: "guildid", value: interaction.guildId }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                if (!res.panel || !res.panel.bool) {
                    return yield interaction.reply({ content: `${client.config.emojis.false} ${langdata.panel.nopanel}`, ephemeral: true });
                }
                if (!interaction.member.roles.cache.has(res.panel.role)) {
                    return yield interaction.reply({ content: `**${client.config.emojis.false} You should have <@&${res.panel.role}>**`, ephemeral: true });
                }
                yield interaction.showModal(yield client.public.ReturnModalSc(langdata, "add"));
            })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                return yield interaction.reply({ content: `${client.config.emojis.false} ${langdata.panel.nopanel}`, ephemeral: true });
            }));
        }
    })
};
exports.default = Event;
