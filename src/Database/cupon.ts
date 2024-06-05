import { model, Schema } from "mongoose";

const UserSchema = new Schema<any>({
    cupon:String,
    duration:String
})


const cupons = model("cupons", UserSchema)

export default cupons;

