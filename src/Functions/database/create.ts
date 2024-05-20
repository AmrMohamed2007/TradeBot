import { Model } from "mongoose";

async function CreateUser(User:Model<any>,data:any) {
    return new Promise((resolve,reject) => {
        User.findOne({[data.key]:data.value}).then((res) => {
            if(!res) {
                const NewUser = new User({
                    [data.key]:data.value
                })
                resolve(NewUser)
            }else {
                reject("have an acc")
            }
          
        })
       
    })
   
 
    
 
}


export  {CreateUser};