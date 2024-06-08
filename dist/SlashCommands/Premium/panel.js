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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const pretty_ms_1 = __importDefault(require("pretty-ms"));
const ms_1 = __importDefault(require("ms"));
const panel = {
    name: "premium",
    description: "Show your book of terra",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "panel",
            description: "Show panel to control your bank account",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand
        },
        {
            name: "info",
            description: "Show info for your account",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand
        },
        {
            name: "buy",
            description: "buy a premium subscription for month/year ",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand
        },
        {
            name: "give",
            description: "give a premium subscription for month/year ",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "userid", description: "userid for user", type: 3, required: true },
                { name: "duration", description: "time for premium", type: 3, required: true }
            ]
        },
        {
            name: "remove",
            description: "remove a premium subscription for user ",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "userid", description: "userid for user", type: 3, required: true },
            ]
        },
        {
            name: "redeam",
            description: "redeam a premium subscription for month/year ",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "code", description: "code for subscription", type: 3, required: true },
            ]
        },
        {
            name: "generate",
            description: "generate a premium subscription for month/year ",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "count", description: "type of count", required: true, type: 10 },
                { name: "duration", description: "durtion", required: true, type: 3 },
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
                    yield client.premium.SetupPanel(client, type, langdata, message);
                }
                else {
                    try {
                        yield client.premium.SetupPanel(client, type, langdata, message);
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
                const res = yield client.functions.get.GetUser(client.schema, { key: "userid", value: message.user.id, status: "one" });
                if (!res.premium || !res.premium.subscribed) {
                    return yield message.reply({ content: `${client.config.emojis.false} ${langdata.premium.nopre}`, ephemeral: true });
                }
                if ((Date.now() - res.premium.createdAt) >= res.premium.days) {
                    res.premium = undefined;
                    yield res.save();
                    return yield message.reply({ content: `${client.config.emojis.false} ${langdata.premium.nopre}` });
                }
                yield returnData(userType);
            }
            if (subcommand === "info") {
                try {
                    const res = yield client.functions.get.GetUser(client.schema, { key: "userid", value: message.user.id, status: "one" });
                    if (!res.premium || !res.premium.subscribed) {
                        return yield message.reply({ content: `${client.config.emojis.false} ${langdata.premium.nopre}` });
                    }
                    if ((Date.now() - res.premium.createdAt) >= res.premium.days) {
                        res.premium = undefined;
                        yield res.save();
                        return yield message.reply({ content: `${client.config.emojis.false} ${langdata.premium.nopre}` });
                    }
                    const embed = yield client.CreateEmbed({
                        title: langdata.premium.titleinfo,
                        fields: [
                            { name: langdata.private.userid, value: `${message.user.id}`, inline: false },
                            { name: langdata.premium.createdAt, value: `${new Date(res.premium.createdAt).toDateString()}`, inline: false },
                            { name: langdata.premium.endsAt, value: `${new Date(Date.now() + res.premium.days).toDateString()}`, inline: false },
                            { name: langdata.premium.days, value: `${(0, pretty_ms_1.default)((res.premium.createdAt + res.premium.days) - Date.now())}`, inline: false }
                        ],
                        color: client.config.maincolor,
                        author: { name: message.guild.name, iconURL: message.guild.iconURL() },
                        footer: { name: message.guild.name, iconURL: message.guild.iconURL() }
                    });
                    yield message.reply({ embeds: [embed] });
                }
                catch (err) {
                    console.log(err);
                    return yield message.reply({ content: `${client.config.emojis.false} ${langdata.captcha[err.message]}` });
                }
            }
            if (subcommand == "buy") {
                try {
                    const res = yield client.functions.get.GetUser(client.schema, { key: "userid", value: message.user.id, status: "one" });
                    if (res.premium.subscribed && (Date.now() - res.premium.createdAt) >= res.premium.days) {
                        res.premium = undefined;
                        yield res.save();
                    }
                    yield client.captcha.CaptchaShape(client, message, langdata, "reply", false, "premiumBuy");
                }
                catch (error) {
                    yield message.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errornoacc}` });
                }
            }
            if (subcommand == "give") {
                if (!client.config.owners.includes(message.user.id))
                    return;
                const userid = message.options.getString("userid");
                const duration = message.options.getString("duration");
                yield client.functions.get.GetUser(client.schema, {
                    status: "one",
                    key: "userid",
                    value: userid
                }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                    const PremiumData = {
                        subscribed: true,
                        createdAt: Date.now(),
                        days: (0, ms_1.default)(duration),
                        code: yield client.public.generateRandomCode()
                    };
                    if (res.premium.subscribed) {
                        res.premium.days = res.premium.days + PremiumData.days;
                        yield client.Log.LogPremiumUser(Object.assign(Object.assign({}, res.premium), { guildid: message.guild.id, user: userid }), langdata, client);
                    }
                    else {
                        res.premium = PremiumData;
                        yield client.Log.LogPremiumUser(Object.assign(Object.assign({}, PremiumData), { guildid: message.guild.id, user: userid }), langdata, client);
                    }
                    yield res.save();
                    yield message.reply({ content: `${client.config.emojis.true} ${langdata.setupdone}`, ephemeral: true });
                })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                    console.log(err);
                    yield message.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errornoacc}`, ephemeral: true });
                }));
            }
            if (subcommand == "remove") {
                if (!client.config.owners.includes(message.user.id))
                    return;
                const userid = message.options.getString("userid");
                yield client.functions.get.GetUser(client.schema, {
                    status: "one",
                    key: "userid",
                    value: userid
                }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                    res.premium = undefined;
                    yield res.save();
                    yield message.reply({ content: `${client.config.emojis.true} ${langdata.setupdone}`, ephemeral: true });
                })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                    yield message.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errornoacc}`, ephemeral: true });
                }));
            }
            if (subcommand == "redeam") {
                const code = message.options.getString("code");
                yield client.functions.get.GetUser(client.cupon, {
                    status: "one",
                    key: "cupon",
                    value: code
                }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                    const PremiumData = {
                        subscribed: true,
                        createdAt: Date.now(),
                        days: (0, ms_1.default)(res.duration),
                        code: yield client.public.generateRandomCode()
                    };
                    yield client.functions.get.GetUser(client.schema, {
                        status: "one",
                        key: "userid",
                        value: message.user.id
                    }).then((ress) => __awaiter(void 0, void 0, void 0, function* () {
                        const codep = ress.premium.subscribed ? ress.premium.code : PremiumData.code;
                        if (ress.premium.subscribed) {
                            ress.premium.days + PremiumData.days;
                        }
                        else {
                            ress.premium = PremiumData;
                        }
                        yield client.Log.LogPremiumUser({
                            days: res.duration,
                            code: codep,
                            guildid: message.guild.id,
                            user: message.user.id,
                            reason: "Cupon Code"
                        }, langdata, client);
                        yield message.reply({ content: `${client.config.emojis.true} ${langdata.setupdone}`, ephemeral: true });
                        yield ress.save();
                        yield client.cupon.deleteOne({ cupon: code });
                    })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                        yield message.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errornoacc}`, ephemeral: true });
                    }));
                })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                    yield message.reply({ content: `${client.config.emojis.false} ${langdata.error}`, ephemeral: true });
                }));
            }
            if (subcommand == "generate") {
                if (!client.config.owners.includes(message.user.id))
                    return;
                const length = message.options.getNumber("count");
                const duration = message.options.getString("duration");
                const arr = [];
                for (let i = 0; i < length; i++) {
                    const code = yield client.public.generateRandomCode();
                    const acc = new client.cupon({
                        cupon: code,
                        duration
                    });
                    yield acc.save();
                    arr.push(code);
                }
                const embed = yield client.CreateEmbed({
                    title: "New Premium Subscription",
                    fields: [
                        arr.map((m) => {
                            return { name: "Cupon Name", value: m, inline: false };
                        })
                    ],
                    color: client.config.maincolor
                });
                yield message.reply({ content: "**Done !**", ephemeral: true });
                yield message.channel.send({ embeds: [embed] });
            }
        }
    })
};
exports.default = panel;
