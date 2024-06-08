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
const GuildCreate = {
    name: discord_js_1.Events.GuildCreate,
    once: false,
    run: (client, guild) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.functions.get.GetUser(client.schemas, { status: "one", key: "guildid", value: guild.id, create: true })
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            if (res.blacklisted.bool) {
                yield guild.leave();
            }
            else {
                var AuthorData = { name: guild.name, iconURL: guild.iconURL() };
                const row = new discord_js_1.ActionRowBuilder();
                const button = new discord_js_1.ButtonBuilder()
                    .setCustomId(`leave_${guild.id}`)
                    .setStyle(discord_js_1.ButtonStyle.Danger)
                    .setLabel("Leave Server");
                const Button2 = new discord_js_1.ButtonBuilder()
                    .setCustomId(`blacklist_server_${guild.id}`)
                    .setStyle(discord_js_1.ButtonStyle.Primary)
                    .setLabel("Blacklist Server");
                row.setComponents(button, Button2);
                const channel = guild.channels.cache.filter(channel => channel.type === discord_js_1.ChannelType.GuildText).first();
                if (!channel)
                    return;
                const invite = yield channel.createInvite();
                yield client.Log.LogJoinServer({
                    title: "New Server",
                    fields: [
                        { name: "Guild Name", value: guild.name, inline: false },
                        { name: "Guild Id", value: guild.id, inline: false },
                        { name: "Guild MembersCount", value: `${guild.memberCount}`, inline: false },
                        { name: "Guild Boosts", value: `${guild.premiumSubscriptionCount}`, inline: false },
                        { name: "Guild CreatedAt", value: `${guild.createdAt}`, inline: false },
                        { name: "Guild InviteURL", value: `${invite}`, inline: false },
                    ],
                    color: client.config.maincolor,
                    author: AuthorData,
                    footer: AuthorData,
                    row
                });
            }
        }));
    })
};
exports.default = GuildCreate;
