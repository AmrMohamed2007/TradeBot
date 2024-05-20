import { Schema, model } from "mongoose"

const ServerSchema = new Schema<any>({
    guildid: String,
    lang: { type: String, default: "en" },
    blacklisted: { type: Boolean, default: false }

})

const Server = model("server", ServerSchema)




export default Server;
