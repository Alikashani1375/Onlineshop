import mongoose from "mongoose";

const MONGODB_URI= process.env.MONGODB_URI;

const connect = async()=>{
    const connectionState = mongoose.connection.readyState;

    if(connectionState === 1){
        console.log('already connected')
    }
    if(connectionState === 2){
        console.log('conneting')
    }
    try{
        mongoose.connect(MONGODB_URI!,{
            dbName:'onlineshop-fullstack',
            bufferCommands:false
        })
        console.log("connected")
    }catch(err){
        console.log('error in connecting to db',err)
    }
}

export default connect