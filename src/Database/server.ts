import { Schema, model } from "mongoose"
import client from "../structure/Client"
const ServerSchema = new Schema<any>({
    guildid: String,
    lang: { type: String, default: "en" },
    blacklisted: {
        bool: Boolean,
        reason: String
    },
    emoji: String,

    image: String,
    winMessage: String,

    colorStart: String,
    colorEnd: String,

    embedTitle: String,
    embedDescription: String,
    footer: { type: Boolean, default: true },
    author: { type: Boolean, default: true },
    thumbnail: { type: Boolean, default: false },

    endEmbedTitle: String,
    endEmbedDescription: String,

    pauseEmbedTitle: String,
    pauseEmbedDescription: String,

    unpauseEmbedTitle: String,
    unpauseEmbedDescription: String,


})

const Server = model("server", ServerSchema)




export default Server;
