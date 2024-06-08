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
const fs = __importStar(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const rest_1 = require("@discordjs/rest");
const discord_js_1 = require("discord.js");
function LoadRoutes(token, botid, slashCommands) {
    return __awaiter(this, void 0, void 0, function* () {
        const rest = new rest_1.REST({ version: "9" }).setToken(token);
        yield rest.put(discord_js_1.Routes.applicationCommands(botid), { body: slashCommands }).catch((err) => {
            console.log(err);
        });
    });
}
function LoadSlashCommands(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const slashCommands = [];
        fs.readdirSync(`${process.cwd()}/dist/SlashCommands/`).forEach((dir) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const files = fs.readdirSync(`${process.cwd()}/dist/SlashCommands/${dir}/`)
                .filter((m) => m.endsWith(".js") || m.endsWith(".ts"));
            if (!files || files.length == 0)
                return;
            for (const FileName of files) {
                const SlashCommand = (_a = require(`${process.cwd()}/dist/SlashCommands/${dir}/${FileName}`)) === null || _a === void 0 ? void 0 : _a.default;
                if (SlashCommand.name) {
                    slashCommands.push(SlashCommand);
                    client.slashCommands.set(SlashCommand.name, SlashCommand);
                }
                else {
                    continue;
                }
            }
        }));
        try {
            yield LoadRoutes(client.token, client.user.id, slashCommands);
            console.log(chalk_1.default.green(`[BOT] - ${slashCommands.length} Slash Commands Registerd`));
        }
        catch (error) {
            console.log(chalk_1.default.red(`[BOT ERROR] - ${error}`));
        }
    });
}
exports.default = LoadSlashCommands;
