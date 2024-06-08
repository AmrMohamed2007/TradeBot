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
function SendMail(client, to, langdata, res, data, type) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (type == client.types.CreateNewAccount) {
                if (!to.includes("@"))
                    return reject(`${langdata.components.createAccount.emailVaild}`);
                const code = yield client.public.generateRandomGmail();
                res.code = code;
                res.sendAt = Date.now();
                res.email = data.gmail;
                res.firstname = data.firstname;
                res.lastname = data.lastname;
                const mailOptions = {
                    from: "discordtradebot@gmail.com",
                    to,
                    subject: 'Email Verification',
                    text: `Thank you for creating account in our services , Your verification code is : ${code}`
                };
                client.transporter.sendMail(mailOptions, (error, info) => __awaiter(this, void 0, void 0, function* () {
                    if (error)
                        return reject(error.message);
                    yield res.save();
                    resolve("done");
                }));
            }
            if (type == client.types.ForgetPasswrod) {
                const code = yield client.public.generateRandomGmail(16);
                const mailOptions = {
                    from: "discordtradebot@gmail.com",
                    to,
                    subject: 'New Password Generator !',
                    text: `The password has been successfully reset.\n The New password is : ${code}`
                };
                res.password = code;
                yield res.save();
                client.transporter.sendMail(mailOptions, (error, info) => __awaiter(this, void 0, void 0, function* () {
                    if (error)
                        return reject(error.message);
                    resolve("done");
                }));
            }
        }));
    });
}
exports.default = { SendMail };
