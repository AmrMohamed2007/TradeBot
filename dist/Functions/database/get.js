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
exports.GetUser = void 0;
const create_1 = require("./create");
function GetUser(User, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (data.status == 'one') {
                yield User.findOne({ [data.key]: data.value }).then((res) => __awaiter(this, void 0, void 0, function* () {
                    if (!res) {
                        if (!data.create) {
                            reject({ type: 404, message: "errornoacc" });
                        }
                        else {
                            const acc = yield (0, create_1.CreateUser)(User, { key: data.key, value: data.value });
                            resolve(acc);
                        }
                    }
                    else {
                        resolve(res);
                    }
                }));
            }
            else {
                resolve(yield User.find({}));
            }
        }));
    });
}
exports.GetUser = GetUser;
