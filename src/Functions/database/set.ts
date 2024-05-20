import { Model } from "mongoose";
import { CreateUser } from "./create";

async function setp(User: Model<any>, key: string, propf: any, keyt: any, prop: any) {
    return new Promise(async(resolve, reject) => {
      await  User.findOne({ [key]: propf }).then(async (res) => {
            if (!res) {
                reject({type:404,message:"errornoacc"})

            } else {
                res[keyt] = prop;
                res.save();
                resolve(res);
            }




        })
    })
}


export { setp };