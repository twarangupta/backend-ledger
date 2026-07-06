const mongoose = require("mongoose")
const URI = process.env.MONGO_URI

async function ConnectDB(){
    try{
        await mongoose.connect(URI)
        console.log("DB Connected Successfully");
        
    }
    catch(err){
        console.log("error connecting DB",err)
        throw err
    }
}
module.exports = ConnectDB