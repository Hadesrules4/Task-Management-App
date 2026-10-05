import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { getSessionUserId } from '@/lib/auth';

export async function GET(){
 try{const id=await getSessionUserId();if(!id||!mongoose.isValidObjectId(id))return NextResponse.json({user:null},{status:401});
 await connectDB();const user=await User.findById(id).select('_id name email');if(!user)return NextResponse.json({user:null},{status:401});
 return NextResponse.json({user:{id:user._id.toString(),name:user.name,email:user.email}});}
 catch(error){console.error(error);return NextResponse.json({error:'Unable to verify session.'},{status:500});}
}