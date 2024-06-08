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
function CaptchaReact(client, message, langdata, fun, typeSecurity) {
    return __awaiter(this, void 0, void 0, function* () {
        var userid = "";
        if (message.author) {
            userid = message.author.id;
        }
        else if (message.user) {
            userid = message.user.id;
        }
        else {
            userid = message.interaction.user.id;
        }
        client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: userid }).then((res) => __awaiter(this, void 0, void 0, function* () {
            if (!res.password && typeSecurity == true)
                return yield message.reply({ content: `${langdata.captcha.nopassword}`, ephemeral: true });
            if (res.password) {
                const Msg = yield message.reply({ content: `${langdata.captcha.passwordtype}`, components: [yield client.captcha.ReturnBtnPassword(client, langdata)], ephemeral: true });
                const collecterer = yield message.channel.createMessageComponentCollector({ filter: u => u.user.id == userid, max: 1 });
                collecterer.on("collect", (col) => __awaiter(this, void 0, void 0, function* () {
                    if (col.customId == "passwordcheck") {
                        yield Msg.delete();
                        yield col.showModal(yield client.captcha.ReturnModalPassword(langdata, fun));
                    }
                }));
            }
            else {
                client.emit(fun, message, langdata);
            }
        })).catch((err) => {
            console.log(err);
            message.reply({ content: `${client.config.emojis.false} ${langdata.captcha[err.message]}` });
        });
    });
}
exports.default = { CaptchaReact };
