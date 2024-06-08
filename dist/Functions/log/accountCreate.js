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
function AccountCreateLog(client, res1, data) {
    return __awaiter(this, void 0, void 0, function* () {
        res1.log.push({
            msg: data.msg,
            time: Date.now(),
            guildid: data.guildid,
            typelog: client.types.CreateAccount
        });
        yield res1.save();
        yield client.Log.LogCustomLog({
            title: "New Account Created",
            fields: [
                { name: "User Id", value: `${data.userid}`, inline: false },
                { name: "Guild Id", value: `${data.guildid}`, inline: false }
            ]
        });
        return true;
    });
}
exports.default = { AccountCreateLog };
