import { StringSelectMenuBuilder } from "discord.js";
import { model, Schema } from "mongoose";

const UserSchema = new Schema<any>({
    hostedby: String,
    createdAt: Number,
    endAt: Number,
    users: [
        { userid: String, image: String, messageId:String }
    ],
    messageId:String,
    ended:{type:Boolean,default:false},
    comptype:String, // images or titles
    compstatus:String,

})


const User = model("comps", UserSchema)

export default User;

