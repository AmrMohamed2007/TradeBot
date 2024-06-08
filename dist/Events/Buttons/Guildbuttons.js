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
    name: "interactionCreate",
    once: false,
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (interaction.isButton() && interaction.customId.startsWith("leave_")) {
            if (!client.config.owners.includes(interaction.user.id))
                return;
            yield Leave(client, interaction, 1);
        }
        if (interaction.isButton() && interaction.customId.startsWith("blacklist_")) {
            if (!client.config.owners.includes(interaction.user.id))
                return;
            const type = interaction.customId.split("_")[1];
            const id = interaction.customId.split("_")[2];
            client.functions.get.GetUser(type == "user" ? client.schema : client.schemas, { status: "one", key: type == "user" ? "userid" : "guildid", value: id, create: true }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                if (type == "server" && res.blacklisted) {
                    res.blacklisted.bool = true;
                    yield res.save();
                    yield Leave(client, interaction, 1);
                }
                if (type == "server" && !res.blacklisted) {
                    res.blacklisted.bool = true;
                    yield res.save();
                    yield Leave(client, interaction, 1);
                }
                if (type == "user" && res.blacklisted) {
                    yield Edit(interaction);
                }
                if (type == "user" && !res.blacklisted) {
                    res.blacklisted.bool = true;
                    yield res.save();
                    yield Edit(interaction);
                }
            })).catch((err) => {
                console.log(err);
            });
        }
    })
};
function Edit(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.deferUpdate();
        const Components = interaction.message.components;
        var comp = discord_js_1.ButtonBuilder.from(interaction.component);
        Components.pop(comp);
        const editedButton = comp
            .setDisabled(true);
        Components.unshift(editedButton);
        const row = new discord_js_1.ActionRowBuilder()
            .setComponents(...Components);
        yield interaction.message.edit({ components: [row] });
    });
}
function Leave(client, interaction, index) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = interaction.customId.split("_")[index];
        var gg = yield client.guilds.cache.get(id);
        yield Edit(interaction);
        if (gg) {
            yield gg.leave();
            client.emit("GuildDelete", client.guilds.cache.get(id));
        }
    });
}
exports.default = Event;
