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
exports.SetLang = exports.GetLang = void 0;
function GetLang(client, guildid) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        var lang = client.langdata.get(guildid);
        if (!lang) {
            var res = yield client.functions.get.GetUser(client.schemas, { status: "one", key: "guildid", value: guildid, create: true });
            lang = res.lang ? res.lang : "en";
            yield res.save();
            client.langdata.set(guildid, lang);
            const LanguageData = (_a = require("../Language/language")) === null || _a === void 0 ? void 0 : _a.default[lang];
            return LanguageData;
        }
        else {
            const LanguageData = (_b = require("../Language/language")) === null || _b === void 0 ? void 0 : _b.default[lang];
            return LanguageData;
        }
    });
}
exports.GetLang = GetLang;
function SetLang(client, guildid, lang) {
    return __awaiter(this, void 0, void 0, function* () {
        client.langdata.set(guildid, lang);
        yield client.functions.set.setp(client.schemas, "guildid", guildid, "lang", lang);
    });
}
exports.SetLang = SetLang;
