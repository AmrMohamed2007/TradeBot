import {Client, PermissionsBitField} from "discord.js"
import { GetLang } from "../../structure/Language";
import * as ms from "ms"
import { WrongEmbed } from "../../Tools/Embeds";

const Event = {
    name: "error",
    once: false,
    run: async (client: Client, err: any) => {
       console.log(err);
       


    }
}

export default Event;