import {Schema,model,models}from "mongoose"

const PhoneSchema= new Schema({
    title:{ type:String, required:true },
    price:{ type:String, required:true },
    image:{ type:String },
    category:{type:String,required:true},
    usercreated:{type:String,required:true},
    user:{type:Schema.Types.ObjectId,ref:'User',required:true}
}) 

const Phone = models.Phone || model("Phone",PhoneSchema)

export default Phone