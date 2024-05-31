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
import {TypesLog} from "./logtypes"
type Config = typeof config
type typeslog = typeof TypesLog
declare module "discord.js" {
  export interface Client {
    config: Config;
    cooldown: Collection<string, string>
    commands: Collection<string, any>
    slashCommands: Collection<string, ApplicationCommandData>
    events: Collection<string, any>
    aliases: Collection<string, string>
    prefix: string
    langdata: Collection<string, string>
    functions: any,
    schema: Model<any>
    SetLang: function
    GetLang: function
    schemas: Model<any>
    CreateEmbed: function
    captcha: any
    shapes: any,
    premium: any
    waitembed: function
    channellog: string
    channeljoin: string
    channelleft: string
    Log: Log
    channelreport: string
    types: typeslog
    public:any
    WrongEmbed:function
    schemaGiveaway:any
    giveawaysManager:any,
    giveawayPackge:any,
    loge:any
  }

}

declare module "ms" {
  export function ms(value: string): number;

}