import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import Task from '@/models/Task';
import { getSessionUserId } from '@/lib/auth';
import { taskSchema } from '@/lib/validation';

type Context={params:Promise<{id:string}>};
export async function PUT(req:Request,{params}:Context){
 try{const userId=await getSessionUserId();if(!userId)return NextResponse.json({error:'Unauthorized'},{status:401});const {id}=await params;
 if(!mongoose.isValidObjectId(id))return NextResponse.json({error:'Invalid task ID.'},{status:400});const parsed=taskSchema.safeParse(await req.json());if(!parsed.success)return NextResponse.json({error:'Invalid task data.'},{status:400});await connectDB();
 const task=await Task.findOneAndUpdate({_id:id,userId},{...parsed.data,dueDate:parsed.data.dueDate?new Date(parsed.data.dueDate):null},{new:true,runValidators:true});if(!task)return NextResponse.json({error:'Task not found.'},{status:404});return NextResponse.json({task});
 }catch(e){console.error(e);return NextResponse.json({error:'Unable to update task.'},{status:500});}
}
export async function DELETE(_req:Request,{params}:Context){
 try{const userId=await getSessionUserId();if(!userId)return NextResponse.json({error:'Unauthorized'},{status:401});const {id}=await params;if(!mongoose.isValidObjectId(id))return NextResponse.json({error:'Invalid task ID.'},{status:400});await connectDB();
 const task=await Task.findOneAndDelete({_id:id,userId});if(!task)return NextResponse.json({error:'Task not found.'},{status:404});return NextResponse.json({ok:true});
 }catch(e){console.error(e);return NextResponse.json({error:'Unable to delete task.'},{status:500});}
}