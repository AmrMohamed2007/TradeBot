import { model, Schema } from "mongoose";

const UserSchema = new Schema<any>({
    userid: String,
    username: String,
    coins: { type: Number, default: 0 },
    lastcoins: { type: Number, default: 0 },
    password: String,
    email:String,
    firstname:String,
    lastname:String,
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
    card:{
        cardNumber:String,
        cvv:String,
        coins:Number
    },
    createdAt: { type: Number, default: Date.now() },
    log: [
        {
            amount:Number,
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
    },
    sendAt:Number,
    code:Number,
    verified:{type:Boolean,default:false}
})


const User = model("user", UserSchema)

export default User;

