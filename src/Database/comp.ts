import { StringSelectMenuBuilder } from "discord.js";
import { model, Schema } from "mongoose";

const UserSchema = new Schema<any>({
    hostedby: String,
    createdAt: Number,
    endAt: Number,
    users: [
        {
            userid: String,
            image: String,
            messageId: String,
            votes:Array,
            winner:Boolean
        }
    ],
    messageId: String,
    ended: { type: Boolean, default: false },
    comptype: String, // images or text
    compstatus: String, // running | paused | unpaused | ended | deleted
    guildid: String,
    channel: String,

})


const User = model("comps", UserSchema)

export default User;

