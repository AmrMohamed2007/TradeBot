import { Model } from "mongoose";
import {CreateUser} from "./create";
async function ToggleSomthing(User: Model<any>, data: any) {
    return new Promise(async (resolve, reject) => {
        await User.findOne({ [data.key]: data.value }).then(async (res) => {
            if (!res) {
                reject({type:404,message:"errornoacc"})

            }else {

         

            if (Array.isArray(res[data.keye])) {
                if (data.status == "add") {
                    await res[data.keye]?.push?.(data.valuee);
                    await res.save()
                    resolve(res[data.keye])
                }
                if (data.status == "remove") {
                    await res[data.keye]?.pop?.(data.valuee);
                    await res.save()
                    resolve(res[data.keye])
                }
            }
            if (typeof res[data.keye] == "number") {
                res[data.keye] += data.valuee
                await res.save();
                resolve(res[data.keye])
            }

        }
        })
    })

}


export  {ToggleSomthing};