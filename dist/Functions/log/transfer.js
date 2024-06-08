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
function Transfer(client, res1, res2, data) {
    return __awaiter(this, void 0, void 0, function* () {
        res1.log.push({
            msg: data.msg,
            userr: res2.userid,
            usert: res1.userid,
            time: Date.now(),
            guildid: data.guildid,
            amount: data.amount,
            typelog: client.types.TransferTerra
        });
        res2.log.push({
            msg: data.msg,
            userr: res2.userid,
            usert: res1.userid,
            time: Date.now(),
            guildid: data.guildid,
            amount: data.amount,
            typelog: client.types.TransferTerra
        });
        yield res1.save();
        yield res2.save();
        yield client.Log.LogCustomLog({
            title: "New Transcution",
            fields: [
                { name: "User Transferd", value: `${res1.userid}`, inline: false },
                { name: "User Recived", value: `${res2.userid}`, inline: false },
            ]
        });
        return true;
    });
}
exports.default = { Transfer };
