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
const panel = {
    name: "blacklist",
    description: "Control on blacklist",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "deleteuser",
            description: "delete an user from blacklist",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "userid",
                    description: "id for user",
                    required: true,
                    type: 3
                },
            ]
        },
        {
            name: "adduser",
            description: "add an user to blacklist ",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "userid",
                    description: "id for userid",
                    required: true,
                    type: 3
                },
                {
                    name: "reason",
                    description: "reason for blacklist",
                    required: true,
                    type: 3
                }
            ]
        },
        {
            name: "view",
            description: "view blacklisted user",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "type",
                    description: "type for blacklist",
                    required: true,
                    type: discord_js_1.ApplicationCommandOptionType.String
                },
                {
                    name: "id",
                    description: "id for user",
                    required: true,
                    type: discord_js_1.ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: "serveradd",
            description: "add server to manage scammer ",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "serverid",
                    description: "serverid for scammer",
                    required: true,
                    type: discord_js_1.ApplicationCommandOptionType.String
                },
                {
                    name: "reason",
                    description: "serverid for scammer",
                    required: true,
                    type: discord_js_1.ApplicationCommandOptionType.String
                },
            ]
        },
        {
            name: "serverremove",
            description: "remove server from servers scammer ",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "serverid",
                    description: "serverid for scammer",
                    required: true,
                    type: discord_js_1.ApplicationCommandOptionType.String
                }
            ]
        },
    ],
    cooldown: 20000,
    botPerms: ["AddReactions", "SendMessages"],
    run: (client, message, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const type = message.options.getString("type");
        const subcommand = message.options.getSubcommand();
        function returnData(type, id) {
            return __awaiter(this, void 0, void 0, function* () {
                if (type == "server") {
                    const res = yield client.functions.get.GetUser(client.schemas, { key: "guildid", value: id, status: "one", create: true });
                    const embed = yield client.CreateEmbed({
                        title: "Server Info",
                        color: client.config.maincolor,
                        fields: [
                            { name: `ServerId`, value: res.guildid, inline: false },
                            { name: "Blacklisted", value: res.blacklisted.bool ? "Yes" : "No", inline: false },
                            { name: "Reason", value: res.blacklisted.reason ? res.blacklisted.reason : "No Reason" }
                        ]
                    });
                    yield message.reply({ embeds: [embed], ephemeral: true });
                }
                if (type == "user") {
                    const res = yield client.functions.get.GetUser(client.schema, { key: "userid", value: id, status: "one", create: true });
                    if (res) {
                        const embed = yield client.CreateEmbed({
                            title: "User Info",
                            color: client.config.maincolor,
                            fields: [
                                { name: `Userid`, value: res.userid, inline: false },
                                { name: "Blacklisted", value: res.blacklisted.bool ? "Yes" : "No", inline: false },
                                { name: "Reason", value: res.blacklisted.reason ? res.blacklisted.reason : "No Reason", inline: false }
                            ]
                        });
                        yield message.reply({ embeds: [embed], ephemeral: true });
                    }
                    else {
                        return yield message.reply({ content: `**${client.config.emojis.false} ${langdata.error}**`, ephemeral: true });
                    }
                }
            });
        }
        if (subcommand) {
            if (subcommand === "view") {
                const id = message.options.getString("id");
                yield returnData(type, id);
            }
            if (subcommand === "deleteuser") {
                try {
                    if (!client.config.owners.includes(message.user.id))
                        return yield message.reply({ content: `${langdata.owner.message}`, ephemeral: true });
                    const ScammerId = message.options.getString("userid");
                    const Userr = yield client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: ScammerId });
                    Userr.blacklisted = undefined;
                    Userr.save();
                    return yield message.reply({ content: `${client.config.emojis.true} ${langdata.setupdone}` });
                }
                catch (err) {
                    console.log(err);
                    return yield message.reply({ content: `${langdata.captcha[err.message]}` });
                }
            }
            if (subcommand == "adduser") {
                if (!client.config.owners.includes(message.user.id))
                    return yield message.reply({ content: `${langdata.owner.message}`, ephemeral: true });
                const ScammerId = message.options.getString("userid");
                const reason = message.options.getString("reason");
                const res = yield client.functions.get.GetUser(client.schema, { key: "userid", value: ScammerId, status: "one" });
                res.blacklisted.bool = true;
                res.blacklisted.reason = reason;
                res.blacklisted.time = Date.now();
                yield res.save();
                yield message.reply({ content: `${client.config.emojis.true} ${langdata.setupdone}`, ephemeral: true });
            }
            if (subcommand == "serveradd") {
                if (!client.config.owners.includes(message.user.id))
                    return yield message.reply({ content: `${langdata.owner.message}`, embeds: [] });
                const Msg = yield message.reply({ embeds: [yield client.waitembed({ description: `${langdata.captcha.waiting}`, color: client.config.maincolor, thing: "Processing" })], ephemeral: true });
                const role = message.options.getString("serverid");
                const reason = message.options.getString("reason");
                const res = yield client.functions.get.GetUser(client.schemas, { key: "guildid", value: role, status: "one", create: true });
                if (res.blacklisted && res.blacklisted.bool == true) {
                    return yield Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}`, embeds: [] });
                }
                res.blacklisted.bool = true;
                res.blacklisted.reason = reason;
                yield res.save();
                yield ((_a = client.guilds.cache.get(role)) === null || _a === void 0 ? void 0 : _a.leave());
                yield Msg.edit({ content: `${client.config.emojis.true} ${langdata.setupdone}`, embeds: [] });
            }
            if (subcommand == "serverremove") {
                if (!client.config.owners.includes(message.user.id))
                    return yield message.reply({ content: `${langdata.owner.message}`, embeds: [] });
                const Msg = yield message.reply({ embeds: [yield client.waitembed({ description: `${langdata.captcha.waiting}`, color: client.config.maincolor, thing: "Processing" })], ephemeral: true });
                const role = message.options.getString("serverid");
                const res = yield client.functions.get.GetUser(client.schemas, { key: "guildid", value: role, status: "one", create: true });
                if (res.blacklisted && res.blacklisted.bool == false) {
                    return yield Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}`, embeds: [] });
                }
                res.blacklisted = undefined;
                yield res.save();
                yield Msg.edit({ content: `${client.config.emojis.true} ${langdata.setupdone}`, embeds: [] });
            }
        }
    })
};
exports.default = panel;
