import { model, Schema } from "mongoose";

const UserSchema = new Schema<any>({
    userid:String,
    userv:String,
    guildid:String
   

})


const User = model("voes", UserSchema)

export default User;

