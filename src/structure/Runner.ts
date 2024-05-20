import client from "./Client";
import {Login} from "./Logger";
import {ConnectMongoose} from "./Mongoose";
async function Run() {
  
    
 
    await Login(client,client.config.token)
    await ConnectMongoose(client.config.mongoose)
}

export default Run;
