import connect from "@/lib/db"
import User from "@/lib/models/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server"

const ObjectId = require('mongoose').Types.ObjectId;

export const GET = async(request:Request)=>{
    try{
        const {searchParams}= new URL(request.url);
        const username= searchParams.get('username');
        const password= searchParams.get('password');
    
        if(!username){
            return new NextResponse(JSON.stringify({message:"invalid or misssing phoneid"}),{status:400})
        }
        if(!password){
            return new NextResponse(JSON.stringify({message:"invalid or misssing phoneid"}),{status:400})
        }
        await connect();

        const user= await User.findOne({username:username,password:password})
        if(!user){
            return new NextResponse('user not found',{status:404})
        }
        return new NextResponse(JSON.stringify(user),{status:200});

    }catch(err){
        return new NextResponse(JSON.stringify({message:`${err}`}),{status:400})

    }
}

export const POST = async (request:Request)=>{
    try{
        const body = await request.json();
        const newUser = new User(body);
        await newUser.save()
        return new NextResponse(JSON.stringify({message:'user is created',user: newUser}),{
            status:200
        })
    }catch(err){
        return new NextResponse(JSON.stringify({message:'error in creating user',err}),{status:500})

    }
}

export const PATCH = async (request:Request)=>{
    try{
        const body = await request.json();
        const {userId,newUsername,newEmail,newPassword}= body;

        await connect();

        if(!userId || !newUsername){
            return new NextResponse(JSON.stringify({message:'id or new username are required'}),{status:500})
        }
        if(!Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message:'invalid user id'}),{status:500})
        }

        const updatedUser= await User.findOneAndUpdate(
            {_id: new ObjectId(userId)},
            {username:newUsername},
            {new:true}
        )

        if(!updatedUser){
            return new NextResponse(JSON.stringify({message:'user not updated successfully'}),{status:500})
        }

        return new NextResponse(JSON.stringify({message:'user updated successfully',user:updatedUser}),{status:500})

       
    }catch(err){
        console.log('err on updating user')
    }
}

export const DELETE = async (request:Request)=>{
    try{
        const body = await request.json();
        const {userId}= body;

        await connect();

        if(!userId ){
            return new NextResponse(JSON.stringify({message:'id is required'}),{status:500})
        }
        if(!Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message:'invalid user id'}),{status:500})
        }

        const deleteUser= await User.findByIdAndDelete(
            {_id: new ObjectId(userId)},

        )

        if(!deleteUser){
            return new NextResponse(JSON.stringify({message:'user not updated successfully'}),{status:500})
        }

        return new NextResponse(JSON.stringify({message:'user deleted successfully',user:deleteUser}),{status:500})

       
    }catch(err){
        console.log('err on updating user')
    }
}
