import Phone from "@/lib/models/phones";
import { Types } from "mongoose";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";
import connect from "@/lib/db";

export const GET = async (request:Request)=>{
    try{

        const {searchParams}= new URL(request.url);
        const userId = searchParams.get('userId')

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message:'invalid user id'}),{status:500})
        }
        
        await connect();
        const user = await User.findById(userId);

        if(!user){
            return new NextResponse('user not found',{status:500})
        }

        const phones = await Phone.find()

        return new NextResponse(JSON.stringify(phones),{status :200})

    }catch(err){
        return new NextResponse('err in fetching phones'+ err,{status:500})
    }
}

export const POST = async (request: Request) => {
    try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get('userId');
      const body = await request.json();
      const { title, price, image, usercreated,category } = body; // تغییر نام فیلد به usercreated
  
      if (!userId || !Types.ObjectId.isValid(userId)) {
        return new NextResponse(JSON.stringify({ message: 'invalid user id' }), { status: 500 });
      }
      await connect();
  
      const user = await User.findById(userId);
  
      if (!user) {
        return new NextResponse('user not found', { status: 500 });
      }
      const newPhone = new Phone({
        title,
        usercreated,
        category,
        price,
        image,
        user: new Types.ObjectId(userId)
      });
      await newPhone.save();
      return new NextResponse('phone added', { status: 200 });
  
    } catch (err: any) {
      return new NextResponse(err);
    }
  };

export const PATCH = async(request:Request)=>{
    try{
        const body = await request.json();
        const {phoneId,title,price,image}= body;

        const {searchParams}= new URL(request.url);
        const userId= searchParams.get('userId');

        if(!phoneId || !Types.ObjectId.isValid(phoneId)){
            return new NextResponse(JSON.stringify({message:"invalid or misssing phoneid"}),{status:400})
        }
        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message:"invalid or misssing phoneid"}),{status:400})
        }

        await connect();
        
        const user = await User.findById(userId);
        if(!user){
            return new NextResponse('user not found',{status:500})
        }

        const phone= await Phone.findOne({_id:phoneId,user:userId})
        if(!phone){
            return new NextResponse('phone not found or does not belong the user',{status:404})
        }

        //update phone
        const updatedPhone = await Phone.findByIdAndUpdate(
            phoneId,
            {title,price,image},
            {new:true}
        )

        return new NextResponse(JSON.stringify({message:'Phone updated',phone:updatedPhone}),{status:200})

    }catch(err){
        return new NextResponse("something missing")
    }
}

export const DELETE = async(request:Request)=>{
    try{
        const {searchParams}= new URL(request.url);
        const userId= searchParams.get('userId');
        const phoneId= searchParams.get('phoneId');
    
        if(!phoneId || !Types.ObjectId.isValid(phoneId)){
            return new NextResponse(JSON.stringify({message:"invalid or misssing phoneid"}),{status:400})
        }
        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message:"invalid or misssing phoneid"}),{status:400})
        }
        await connect();

        const phone= await Phone.findOne({_id:phoneId,user:userId})
        await Phone.findByIdAndDelete(phoneId)
        return new NextResponse('phone deleted successfully ',{status:404})

    }catch(err){
        return new NextResponse(JSON.stringify({message:"err on deleting"}),{status:400})

    }
 
}