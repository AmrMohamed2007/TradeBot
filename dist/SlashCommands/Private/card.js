"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const canvas_1 = __importStar(require("canvas"));
const terra = {
    name: "card",
    description: "show your book of terra",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    cooldown: 10000,
    databaseActions: ["blacklist", "scummer"],
    botPerms: ["AddReactions", "SendMessages"],
    options: [
        {
            name: "view",
            description: "show your card data",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "create",
            description: "create your card data",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "firstname", description: "type your first name", required: true, type: 3 },
                { name: "lastname", description: "type your lastname", required: true, type: 3 },
            ],
        },
        {
            name: "balance",
            description: "show your card balance",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "transfer",
            description: "transfer from card to another card",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "yourcvv", description: "type your cvv", required: true, type: 10 },
                { name: "cardnumber", description: "type card number for seller", required: true, type: 10 },
                { name: "amount", description: "amount of transfer", required: true, type: 10 }
            ],
        },
    ],
    run: (client, interaction, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        const Subcommand = interaction.options.getSubcommand();
        if (Subcommand == "view") {
            yield interaction.deferReply({ ephemeral: true });
            client.functions.get.GetUser(client.schema, {
                status: "one",
                key: "userid",
                value: interaction.user.id
            }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                if (!res.card.cardNumber)
                    return yield interaction.followUp({ content: langdata.card.errorhavecard, ephemeral: true });
                yield interaction.followUp({ content: undefined, files: [(yield LoadCard({ first: res.firstname, last: res.lastname, CardNumber: res.card.cardNumber, cvv: res.card.cvv })).attachment] });
            })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                console.log(err);
                yield interaction.followUp({ content: langdata.captcha.errornoacc });
            }));
        }
        if (Subcommand == "balance") {
            yield interaction.deferReply({ ephemeral: true });
            client.functions.get.GetUser(client.schema, {
                status: "one",
                key: "userid",
                value: interaction.user.id
            }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                if (!res.card.cardNumber)
                    return yield interaction.followUp({ content: langdata.card.errorhavecard, ephemeral: true });
                yield interaction.followUp({ content: `**${langdata.card.balance.replace("[amount]", `${res.card.coins}`).replace("[emoji]", client.config.emojis.atm)}**` });
            })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                console.log(err);
                yield interaction.followUp({ content: langdata.captcha.errornoacc });
            }));
        }
        if (Subcommand == "transfer") {
            const count = interaction.options.getNumber("amount").toFixed(1);
            const yourcvv = interaction.options.getNumber("yourcvv");
            const cardnumber = interaction.options.getNumber("cardnumber");
            yield interaction.deferReply({ ephemeral: true });
            client.functions.get.GetUser(client.schema, {
                status: "one",
                key: "userid",
                value: interaction.user.id
            }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                if (!res.card.cardNumber)
                    return yield interaction.followUp({ content: langdata.card.errorhavecard, ephemeral: true });
                if (res.card.cvv !== yourcvv) {
                    return yield interaction.followUp({ content: `${client.config.emojis.false} ${langdata.card.cvverror}` });
                }
                if (res.card.coins < count) {
                    return yield interaction.followUp({ content: `${client.config.emojis.false} ${langdata.card.coinserror}` });
                }
                client.functions.get.GetUser(client.schema, {
                    status: "one",
                    key: "card.cardNumber",
                    value: cardnumber
                }).then((ress) => __awaiter(void 0, void 0, void 0, function* () {
                    ress.card.coins = ress.card.coins + count;
                    res.card.coins = res.card.coins - count;
                    yield ress.save();
                    yield res.save();
                    yield interaction.followUp({ content: `${client.config.emojis.true} ${langdata.card.donetransfer}` });
                })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                    yield interaction.followUp({ content: `**${client.config.emojis.false} ${langdata.card.userdoesnthave} or ${langdata.card.cardnumbererror}**` });
                }));
            })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                console.log(err);
                yield interaction.followUp({ content: langdata.captcha.errornoacc });
            }));
        }
        if (Subcommand == "create") {
            yield interaction.deferReply({ ephemeral: true });
            const CardNumber = interaction.user.id.slice(0, 4).concat(yield client.public.generateRandomGmail(8));
            const cvv = yield client.public.generateRandomGmail(3);
            const firstname = interaction.options.getString("firstname");
            const lastname = interaction.options.getString("lastname");
            client.functions.get.GetUser(client.schema, {
                status: "one",
                key: "userid",
                value: interaction.user.id
            }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                if (!res.verified || !res)
                    return yield interaction.followUp({ content: langdata.captcha.errornoacc, ephemeral: true });
                if (res.card.cardNumber)
                    return yield interaction.followUp({ content: langdata.card.errorhavecard, ephemeral: true });
                res.firstname = firstname;
                res.lastname = lastname;
                res.card.cardNumber = CardNumber;
                res.card.cvv = cvv;
                res.card.coins = 0;
                yield res.save();
                yield interaction.followUp({ content: langdata.card.donecard, files: [(yield LoadCard({ first: res.firstname, last: res.lastname, CardNumber, cvv })).attachment] });
            })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                console.log(err);
                return yield interaction.followUp({ content: langdata.captcha.errornoacc, ephemeral: true });
            }));
        }
    })
};
exports.default = terra;
function LoadCard(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const imagePath = `${process.cwd()}/dist/assets/images/card.png`;
        const fontPath = `${process.cwd()}/dist/assets/fonts/digital.ttf`;
        const fontPathPp = `${process.cwd()}/dist/assets/fonts/poppins.extralight.ttf`;
        const { createCanvas, loadImage } = canvas_1.default;
        const canvas = createCanvas(349.92, 221.51);
        const ctx = canvas.getContext('2d');
        const number = data.CardNumber.split("").join(" ");
        const cvv = data.cvv.split("").join(" ");
        const firstname = data.first;
        const lastname = ` ${data.last}`;
        const image = yield loadImage(imagePath);
        yield ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        yield (0, canvas_1.registerFont)(fontPath, { family: 'digital' });
        yield (0, canvas_1.registerFont)(fontPathPp, { family: 'Poppins' });
        ctx.font = `25px digital`;
        ctx.fillStyle = `#ffffff`;
        ctx.fillText(number, 55, 99);
        ctx.font = `12px Poppins`;
        ctx.fillStyle = `#ffffff`;
        ctx.fillText(firstname.concat(lastname), 30, 180, 90);
        ctx.font = `12px digital`;
        ctx.fillStyle = `#ffffff`;
        ctx.fillText(cvv, 295, 185);
        yield ctx.save();
        const Card = new discord_js_1.AttachmentBuilder(canvas.toBuffer(), { "name": "Card" });
        return Card;
    });
}
