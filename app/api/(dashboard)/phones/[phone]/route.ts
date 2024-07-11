import connect from "@/lib/db";
import Phone from "@/lib/models/phones";
import User from "@/lib/models/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";


export const GET = async(request:Request,context:{params:any})=>{
    const phoneId=context.params.phone;
    try{
        const {searchParams}= new URL(request.url)
        const userId=searchParams.get('userId')

        if(!userId || Types.ObjectId.isValid(userId)){
            return new NextResponse(
                JSON.stringify({message:'invalid or missing user id'}),{status:404}
            )
        }

        if(!phoneId || Types.ObjectId.isValid(phoneId)){
            return new NextResponse(
                JSON.stringify({message:'invalid or missing phone id'}),{status:404}
            )
        }

        await connect() ;

        const user = await User.findById(userId)

        if(!user ){
            return new NextResponse(
                JSON.stringify({message:'user not found'}),{status:404}
            )
        }

        const phone= await Phone.findOne({_id:phoneId,user:userId})
        if(!phone){
            return new NextResponse('phone not found or does not belong the user',{status:404})
        }

        return new NextResponse(JSON.stringify(phone),{status:200})

    }catch(err){
        return new NextResponse('err in fetching phone'+ err)
    }
}