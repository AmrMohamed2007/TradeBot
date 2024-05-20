import { Model } from "mongoose";

async function Delete(User:Model<any>,data:any) {
   await User.deleteOne({[data.key]:data.value});
}


export  {Delete};