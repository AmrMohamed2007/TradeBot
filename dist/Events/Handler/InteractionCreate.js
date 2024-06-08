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
const Embeds_1 = require("../../Tools/Embeds");
const pretty_ms_1 = __importDefault(require("pretty-ms"));
const Event = {
    name: "interactionCreate",
    once: false,
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const slashCommand = client.slashCommands.get(interaction.commandName);
        if (!slashCommand)
            return client.slashCommands.delete(interaction.commandName);
        if (interaction.type !== 2)
            return;
        var { cooldown, GetLang } = client;
        var LangData = yield GetLang(client, interaction.guild.id);
        var MemberClient = interaction.guild.members.cache.get(client.user.id);
        function RunSlashHandle(client) {
            return __awaiter(this, void 0, void 0, function* () {
                var { user } = interaction;
                if (slashCommand.cooldown) {
                    if (cooldown.has(`${slashCommand.name}${user.id}`))
                        return yield interaction.reply({ content: `${LangData.cooldown.message.replace("<duration>", (0, pretty_ms_1.default)(cooldown.get(`${slashCommand.name}${user.id}`) - Date.now()))}`, ephemeral: true });
                    if (slashCommand.owner && !client.config.owners.includes(user.id))
                        return yield interaction.reply({ content: `${LangData.owner.message}`, ephemeral: true });
                    if (slashCommand.ownership && interaction.user.id !== interaction.guild.ownerId)
                        return yield interaction.reply({ content: `${LangData.ownership.message}`, ephemeral: true });
                    if (slashCommand.botPerms || slashCommand.userPerms) {
                        if (!MemberClient.permissions.has(discord_js_1.PermissionsBitField.resolve(slashCommand.botPerms || [])))
                            return yield interaction.reply({ embeds: [yield (0, Embeds_1.WrongEmbed)({ title: "Missing Permission", description: LangData.permissionme, color: client.config.maincolor, permission: `${slashCommand.botPerms}` })], ephemeral: true });
                        if (!interaction.member.permissions.has(discord_js_1.PermissionsBitField.resolve(slashCommand.userPerms || [])))
                            return yield interaction.reply({ embeds: [yield (0, Embeds_1.WrongEmbed)({ title: "Missing Permission", description: LangData.permission, color: client.config.maincolor, permission: `${slashCommand.userPerms}` })], ephemeral: true });
                    }
                    slashCommand.run(client, interaction, LangData);
                    cooldown.set(`${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown);
                    setTimeout(() => {
                        cooldown.delete(`${slashCommand.name}${user.id}`);
                    }, slashCommand.cooldown);
                }
                else {
                    if (slashCommand.owner && !client.config.owners.includes(user.id))
                        return yield interaction.reply({ content: `${LangData.owner.message}`, ephemeral: true });
                    if (slashCommand.ownership && interaction.user.id !== interaction.guild.ownerId)
                        return yield interaction.reply({ content: `${LangData.ownership.message}`, ephemeral: true });
                    if (slashCommand.botPerms || slashCommand.userPerms) {
                        if (!MemberClient.permissions.has(discord_js_1.PermissionsBitField.resolve(slashCommand.botPerms || [])))
                            return yield interaction.reply({ embeds: [yield (0, Embeds_1.WrongEmbed)({ title: "Missing Permission", description: LangData.permissionme, color: client.config.maincolor, permission: `${slashCommand.botPerms}` })], ephemeral: true });
                        if (!interaction.member.permissions.has(discord_js_1.PermissionsBitField.resolve(slashCommand.userPerms || [])))
                            return yield interaction.reply({ embeds: [yield (0, Embeds_1.WrongEmbed)({ title: "Missing Permission", description: LangData.permission, color: client.config.maincolor, permission: `${slashCommand.userPerms}` })], ephemeral: true });
                    }
                    slashCommand.run(client, interaction, LangData);
                }
            });
        }
        if (slashCommand.databaseActions) {
            yield client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: `${interaction.user.id}` }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                if (slashCommand.databaseActions.includes("blacklist") && res.blacklisted.bool) {
                    if (cooldown.has(`${slashCommand.name}${interaction.user.id}`))
                        return yield interaction.reply({ content: `${LangData.cooldown.message.replace("<duration>", (0, pretty_ms_1.default)(cooldown.get(`${slashCommand.name}${interaction.user.id}`) - Date.now()))}`, ephemeral: true });
                    cooldown.set(`${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown);
                    setTimeout(() => {
                        cooldown.delete(`${slashCommand.name}${interaction.user.id}`);
                    }, slashCommand.cooldown);
                    return yield interaction.reply({ content: `${LangData.private.blacklistedmsg}`, ephemeral: true });
                }
                else if (slashCommand.databaseActions.includes("scummer") && res.scummer.bool) {
                    if (cooldown.has(`${slashCommand.name}${interaction.user.id}`))
                        return yield interaction.reply({ content: `${LangData.cooldown.message.replace("<duration>", (0, pretty_ms_1.default)(cooldown.get(`${slashCommand.name}${interaction.user.id}`) - Date.now()))}`, ephemeral: true });
                    cooldown.set(`${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown);
                    setTimeout(() => {
                        cooldown.delete(`${slashCommand.name}${interaction.user.id}`);
                    }, slashCommand.cooldown);
                    return yield interaction.reply({ content: `${LangData.private.scummermsg}`, ephemeral: true });
                }
                else if (slashCommand.databaseActions.includes("premium") && !res.premium.subscribed) {
                    if (cooldown.has(`${slashCommand.name}${interaction.user.id}`))
                        return yield interaction.reply({ content: `${LangData.cooldown.message.replace("<duration>", (0, pretty_ms_1.default)(cooldown.get(`${slashCommand.name}${interaction.user.id}`) - Date.now()))}`, ephemeral: true });
                    cooldown.set(`${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown);
                    setTimeout(() => {
                        cooldown.delete(`${slashCommand.name}${interaction.user.id}`);
                    }, slashCommand.cooldown);
                    return yield interaction.reply({ content: `${LangData.premium.nopre}`, ephemeral: true });
                }
                else {
                    RunSlashHandle(client);
                }
            })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                return yield interaction.reply({ content: `${client.config.emojis.false} ${LangData.captcha.errornoacc}`, ephemeral: true });
            }));
        }
        else {
            return yield RunSlashHandle(client);
        }
    })
};
exports.default = Event;
