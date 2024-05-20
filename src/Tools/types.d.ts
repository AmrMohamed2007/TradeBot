import type {
    APIApplicationCommand,
    Client,
    Collection,
    CacheType,
    ChatInputCommandInteraction,
  } from "discord.js";
  import type { EventEmitter } from "events";
  import * as config from "../config.json"
import { Model } from "mongoose";
import { Log } from "./Log";
  type Config = typeof config
  declare module "discord.js" {
    export interface Client {
        config:Config;
        cooldown:Collection<string,string>
        commands:Collection<string,any>
        slashCommands:Collection<string,ApplicationCommandData>
        events:Collection<string,any>
        aliases:Collection<string,string>
        prefix:Collection<string,string>
        langdata:Collection<string,string>
        functions:array
        schema:Model
        SetLang:function
        GetLang:function
        schemas:Model
        CreateEmbed:function
        captcha:any
        shapes:array,
        premium:any
        waitembed:function
        channellog:string
        channeljoin:string
        channelleft:string
        Log:Log
        channelreport:string
    }

}
declare module "ms" {
  export function ms(value: string): number;

}