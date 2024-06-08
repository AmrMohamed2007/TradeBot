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
exports.setp = void 0;
function setp(User, key, propf, keyt, prop) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield User.findOne({ [key]: propf }).then((res) => __awaiter(this, void 0, void 0, function* () {
                if (!res) {
                    reject({ type: 404, message: "errornoacc" });
                }
                else {
                    res[keyt] = prop;
                    res.save();
                    resolve(res);
                }
            }));
        }));
    });
}
exports.setp = setp;
