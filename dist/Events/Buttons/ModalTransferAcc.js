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
const Event = {
    name: "interactionCreate",
    once: false,
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (interaction.isModalSubmit() && interaction.customId == "transferaccountmodal") {
            const langdata = yield client.GetLang(client, interaction.guild.id);
            const userid = interaction.fields.getTextInputValue("useridtransfermodal");
            client.functions.get.GetUser(client.schema, { status: "all" }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                const MainPerson = res.find((m) => m.userid == interaction.user.id);
                const SecondMainPerson = res.find((m) => m.userid == userid);
                if (!SecondMainPerson) {
                    const createdData = new client.schema({
                        userid,
                        coins: MainPerson === null || MainPerson === void 0 ? void 0 : MainPerson.coins,
                        premium: MainPerson === null || MainPerson === void 0 ? void 0 : MainPerson.premium,
                        daily: MainPerson === null || MainPerson === void 0 ? void 0 : MainPerson.daily,
                        blacklisted: MainPerson === null || MainPerson === void 0 ? void 0 : MainPerson.blacklisted,
                        log: MainPerson === null || MainPerson === void 0 ? void 0 : MainPerson.log,
                        secured: MainPerson === null || MainPerson === void 0 ? void 0 : MainPerson.secured,
                        password: MainPerson === null || MainPerson === void 0 ? void 0 : MainPerson.password
                    });
                    yield client.schema.deleteOne({ userid: MainPerson.userid });
                    yield createdData.save();
                    yield interaction.reply({ content: `${client.config.emojis.true} ${langdata.premium.donetransferacc}`, ephemeral: true });
                }
                else {
                    yield interaction.reply({ content: `${client.config.emojis.false} ${langdata.premium.haveacctransfer}`, ephemeral: true });
                }
            }));
        }
    })
};
exports.default = Event;
