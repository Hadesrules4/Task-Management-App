import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { registerSchema } from '@/lib/validation';
import { createSession,setSession } from '@/lib/auth';

export async function POST(req:Request){
 try{const parsed=registerSchema.safeParse(await req.json());if(!parsed.success)return NextResponse.json({error:'Invalid registration data.'},{status:400});
 await connectDB();const {name,email,password}=parsed.data;if(await User.exists({email}))return NextResponse.json({error:'An account with this email already exists.'},{status:409});
 const hash=await bcrypt.hash(password,12);const user=await User.create({name,email,password:hash});await setSession(await createSession(user._id.toString()));
 return NextResponse.json({user:{id:user._id.toString(),name:user.name,email:user.email}},{status:201});
 }catch(e){console.error(e);return NextResponse.json({error:'Unable to create account.'},{status:500});}
}