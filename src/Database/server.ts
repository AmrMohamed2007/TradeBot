import { Schema, model } from "mongoose"
const ServerSchema = new Schema<any>({
    guildid: String,
    lang: { type: String, default: "en" },
    blacklisted: {
        bool: Boolean,
        reason: String
    },
    panel: {
        bool:Boolean,
        role:String,
    },
    reaction: {
        type: String,
        default: "<:6556:1243622173386608801>"
    }, // PNG GIVEAWAY
    image: String,
    color_start: {
        type: String,
        default: "#00FF75" // Main Color
    },
    color_end: {
        type: String,
        default: "Red" // WRONG Color
    },
    thumbnail: String,

    react_comp:String,
    image_comp:String,
    thumbnail_comp:String,
    title_comp:String,
    desc_comp:String,
    comp_channel_joiners:String,
    comp_channel_mosabka:String




})

const Server = model("server", ServerSchema)




export default Server;
