import chalk from "chalk";
import mongoose from "mongoose";
async function ConnectMongoose(URI:string) {
    mongoose.connect(URI).then(() => {
        console.log(chalk.green(`[MONGOOSE] Connected`));
        
    }).catch(err => {
        console.log(chalk.red(`[MONGOOSE ERROR] ${err.message}`));
        
    })

}

export {ConnectMongoose};