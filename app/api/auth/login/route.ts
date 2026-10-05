import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { loginSchema } from '@/lib/validation';
import { createSession,setSession } from '@/lib/auth';

export async function POST(req:Request){
 try{const parsed=loginSchema.safeParse(await req.json());if(!parsed.success)return NextResponse.json({error:'Invalid email or password.'},{status:400});
 await connectDB();const user=await User.findOne({email:parsed.data.email});if(!user||!(await bcrypt.compare(parsed.data.password,user.password)))return NextResponse.json({error:'Invalid email or password.'},{status:401});
 await setSession(await createSession(user._id.toString()));return NextResponse.json({user:{id:user._id.toString(),name:user.name,email:user.email}});
 }catch(e){console.error(e);return NextResponse.json({error:'Unable to sign in.'},{status:500});}
}