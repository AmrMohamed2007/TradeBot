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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadFunctions = void 0;
const fs = __importStar(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const nodemailer_1 = __importDefault(require("nodemailer"));
function LoadFunctions(client) {
    return __awaiter(this, void 0, void 0, function* () {
        fs.readdirSync(`${process.cwd()}/dist/Functions/database/`).filter((m) => m.endsWith(".ts") || m.endsWith(".js")).forEach((file) => __awaiter(this, void 0, void 0, function* () {
            const ModuleFunction = require(`${process.cwd()}/dist/Functions/database/${file}`);
            const FunctionName = file.includes(".js") ? file.split(".js")[0] : file.split(".tss")[0];
            client.functions[FunctionName] = ModuleFunction;
        }));
        const Functions = require("./Language");
        client.GetLang = Functions.GetLang;
        client.SetLang = Functions.SetLang;
        console.log(chalk_1.default.green("[MONGOOSE] All Functions Loaded"));
        client.CreateEmbed = require("../Tools/Embeds").CreateEmbd;
        client.waitembed = require("../Tools/Embeds").WaitingEmbed;
        client.WrongEmbed = require("../Tools/Embeds").WrongEmbed;
        client.types = require("../Tools/logtypes").TypesLog;
        console.log(chalk_1.default.green("[BOT] All UTILS Functions Loaded"));
        fs.readdirSync(`${process.cwd()}/dist/Functions/Security/`).forEach((file) => {
            var _a;
            const Functionm = (_a = require(`${process.cwd()}/dist/Functions/Security/${file}`)) === null || _a === void 0 ? void 0 : _a.default;
            const data = Object.entries(Functionm);
            data.forEach((m) => {
                client.captcha[m[0]] = m[1];
            });
        });
        console.log(chalk_1.default.green("[BOT] All Security Functions Loaded"));
        fs.readdirSync(`${process.cwd()}/dist/Functions/Permium/`).forEach((file) => {
            var _a;
            const Functionm = (_a = require(`${process.cwd()}/dist/Functions/Permium/${file}`)) === null || _a === void 0 ? void 0 : _a.default;
            const data = Object.entries(Functionm);
            data.forEach((md) => {
                client.premium[md[0]] = md[1];
            });
        });
        fs.readdirSync(`${process.cwd()}/dist/Functions/Public/`).forEach((file) => {
            var _a;
            const Functionm = (_a = require(`${process.cwd()}/dist/Functions/Public/${file}`)) === null || _a === void 0 ? void 0 : _a.default;
            const data = Object.entries(Functionm);
            data.forEach((md) => {
                client.public[md[0]] = md[1];
            });
        });
        console.log(chalk_1.default.green("[BOT] All Components Functions Loaded"));
        const { Log } = require("../Tools/Log");
        client.Log = new Log(client);
        yield client.Log.setLog("channeljoin");
        yield client.Log.setLog("channelleft");
        yield client.Log.setLog("channellog");
        yield client.Log.setLog("channelreport");
        console.log(chalk_1.default.green("[BOT] All Log Functions Loaded"));
        client.giveawaysManager = yield client.functions.manger(client);
        client.transporter = yield nodemailer_1.default.createTransport({
            service: 'hotmail',
            auth: {
                user: "tradebotdiscord@hotmail.com",
                pass: "kgdyymfxwqaxqenu"
            }
        });
    });
}
exports.LoadFunctions = LoadFunctions;
