import { Model } from "mongoose";
import {CreateUser} from "./create";

async function GetUser(User:Model<any>,data:any) {
    return new Promise(async (resolve , reject) => {

        
    if(data.status == 'one') {
     
        
     await User.findOne({[data.key]:data.value}).then(async (res) => {
        if(!res) {
            if(!data.create) {
                reject({type:404,message:"errornoacc"})
            }else {
                const acc = await CreateUser(User,{key:data.key,value:data.value})
              
                resolve(acc)
            }
   
        }else {
          
            
        
            resolve(res);
        }
       
      
        
       
    
    })
        
    }else {
        resolve(await User.find({}));
    }
})

}


export  {GetUser};