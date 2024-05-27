import { model, Schema } from "mongoose";

const UserSchema = new Schema<any>({
    userid: String,
    username: String,
    coins: { type: Number, default: 0 },
    lastcoins: { type: Number, default: 0 },
    password: String,
    blacklisted: {
        bool: Boolean,
        reason: String,
        time: Number
    },
    premium: {
        subscribed: Boolean,
        createdAt: Number,
        days: Number,
        code: String
    },
    createdAt: { type: Number, default: Date.now() },
    log: [
        {
            msg: String,
            userr: String,
            usert: String,
            typelog: Number,
            time: Number,
            guildid: String
        }],
    daily: {
        taken: Boolean,
        takenAt: Number
    },
    secured: { type: Boolean, default: false },
    scummer: {
        bool: Boolean,
        data: [
            {
                user: String, amount: String,
                product: String,
                time: Number


            }
        ]
    }
})


const User = model("user", UserSchema)

export default User;

