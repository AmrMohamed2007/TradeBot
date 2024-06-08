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
    name: "scammers",
    description: "Control on scammer",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "panel",
            description: "Show panel show scammer",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand
        },
        {
            name: "delete",
            description: "delete an scammer",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "scammerid",
                    description: "id for scammer",
                    required: true,
                    type: 3
                },
            ]
        },
        {
            name: "add",
            description: "add an scammer ",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "scammerid",
                    description: "id for scammer",
                    required: true,
                    type: 3
                },
                {
                    name: "count",
                    description: "dev only",
                    required: true,
                    type: 10
                },
                {
                    name: "user",
                    description: "dev only",
                    required: true,
                    type: 3
                }
            ]
        },
        {
            name: "roleadd",
            description: "add role to add scammer ",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "role",
                    description: "id for role",
                    required: true,
                    type: discord_js_1.ApplicationCommandOptionType.Role
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
                }
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
        const userType = client.config.owners.includes(message.user.id) ? "owner" : "user";
        const subcommand = message.options.getSubcommand();
        function returnData(type) {
            return __awaiter(this, void 0, void 0, function* () {
                if (type === "owner") {
                    yield client.premium.SetupScummer(client, type, langdata, message);
                }
                else {
                    try {
                        yield client.premium.SetupScummer(client, type, langdata, message);
                    }
                    catch (err) {
                        return yield message.reply({ content: `${langdata.captcha[err.message]}` });
                    }
                }
            });
        }
        if (subcommand) {
            if (subcommand === "panel") {
                const user = message.user;
                if (user.bot)
                    return;
                const res = yield client.functions.get.GetUser(client.schemas, { key: "guildid", value: message.guild.id, status: "one" });
                if (!res.panel || !res.panel.bool) {
                    return yield message.reply({ content: `${langdata.panel.nopanel}`, ephemeral: true });
                }
                if (message.user.id !== message.guild.ownerId)
                    return yield message.reply({ content: `${langdata.scammer.ownershippremiusson}` });
                yield returnData(userType);
            }
            if (subcommand === "delete") {
                try {
                    if (!client.config.owners.includes(message.user.id))
                        return yield message.reply({ content: `${langdata.owner.message}`, ephemeral: true });
                    const ScammerId = message.options.getString("scammerid");
                    const Userr = yield client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: ScammerId });
                    if (!Userr || Userr.length == 0)
                        return yield message.reply({ content: `${langdata.error}\n\`No Scammers was saved\``, ephemeral: true });
                    Userr.scummer = undefined;
                    Userr.coins = Userr.lastcoins;
                    Userr.lastcoins = 0;
                    Userr.save();
                    return yield message.reply({ content: `${client.config.emojis.true} ${langdata.scammer.doneDeleted}` });
                }
                catch (err) {
                    console.log(err);
                    return yield message.reply({ content: `${langdata.captcha[err.message]}` });
                }
            }
            if (subcommand == "add") {
                if (!client.config.owners.includes(message.user.id))
                    return yield message.reply({ content: `${langdata.owner.message}`, ephemeral: true });
                const ScammerId = message.options.getString("scammerid");
                const usred = message.options.getString("user");
                const count = message.options.getNumber("count");
                const ress = yield client.functions.get.GetUser(client.schema, { key: "userid", value: usred, status: "one" });
                const res = yield client.functions.get.GetUser(client.schema, { key: "userid", value: ScammerId, status: "one" });
                res.scummer.bool = true;
                res.scummer.data.push({
                    usred,
                    product: count,
                    time: Date.now()
                });
                ress.coins = ress.coins + count;
                res.lastcoins = res.coins;
                res.coins = 0;
                yield res.save();
                yield ress.save();
                yield message.reply({ content: `${langdata.scammer.doneAdded}`, ephemeral: true });
            }
            if (subcommand == "roleadd") {
                const Msg = yield message.reply({ embeds: [yield client.waitembed({ description: `${langdata.captcha.waiting}`, color: client.config.maincolor, thing: "Processing" })], ephemeral: true });
                const role = message.options.getRole("role").id;
                const res = yield client.functions.get.GetUser(client.schemas, { key: "guildid", value: message.guildId, status: "one" });
                if (message.user.id !== message.guild.ownerId)
                    return yield Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}`, embeds: [] });
                if (!res.panel && !res.panel.bool) {
                    return yield Msg.edit({ content: `${client.config.emojis.false} ${langdata.panel.nopanel}`, embeds: [] });
                }
                res.panel.role = role;
                yield res.save();
                yield Msg.edit({ content: `${client.config.emojis.true} ${langdata.setupdone}`, embeds: [] });
            }
            if (subcommand == "serveradd") {
                if (!client.config.owners.includes(message.user.id))
                    return yield message.reply({ content: `${langdata.owner.message}`, embeds: [] });
                const Msg = yield message.reply({ embeds: [yield client.waitembed({ description: `${langdata.captcha.waiting}`, color: client.config.maincolor, thing: "Processing" })], ephemeral: true });
                const role = message.options.getString("serverid");
                const res = yield client.functions.get.GetUser(client.schemas, { key: "guildid", value: role, status: "one", create: true });
                if (res.panel && res.panel.bool == true) {
                    return yield Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}`, embeds: [] });
                }
                res.panel.bool = true;
                yield res.save();
                yield Msg.edit({ content: `${client.config.emojis.true} ${langdata.setupdone}`, embeds: [] });
            }
            if (subcommand == "serverremove") {
                if (!client.config.owners.includes(message.user.id))
                    return yield message.reply({ content: `${langdata.owner.message}`, embeds: [] });
                const Msg = yield message.reply({ embeds: [yield client.waitembed({ description: `${langdata.captcha.waiting}`, color: client.config.maincolor, thing: "Processing" })], ephemeral: true });
                const role = message.options.getString("serverid");
                const res = yield client.functions.get.GetUser(client.schemas, { key: "guildid", value: role, status: "one", create: true });
                if (res.panel && res.panel.bool == false) {
                    return yield Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}`, embeds: [] });
                }
                res.panel = undefined;
                yield res.save();
                yield Msg.edit({ content: `${client.config.emojis.true} ${langdata.setupdone}`, embeds: [] });
            }
        }
    })
};
exports.default = panel;
