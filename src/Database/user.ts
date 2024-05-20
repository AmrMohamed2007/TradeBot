import { model, Schema } from "mongoose";

const UserSchema = new Schema<any>({
    userid: String,
    username: String,
    coins: { type: Number, default: 0 },
    password: Number,
    blacklisted: { type: Boolean, default: false },
    premium: { subscribed: Boolean, createdAt: Number, days: Number },
    createdAt: { type: Number, default: Date.now() },
    log: [{ msg: String, user: String, user2: String, typelog: Number }],
    daily: { taken: Boolean, takenAt: Number },
    secured: { type: Boolean, default: false },
    scummer:{type:Boolean,default:false}
})


const User = model("user", UserSchema)

export default User;