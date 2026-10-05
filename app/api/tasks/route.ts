import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Task from '@/models/Task';
import { getSessionUserId } from '@/lib/auth';
import { taskSchema } from '@/lib/validation';

function escapeRegex(value:string){return value.replace(/[.*+?^$()|[\]\\]/g,'\\$&');}
export async function GET(req:Request){
 try{const userId=await getSessionUserId();if(!userId)return NextResponse.json({error:'Unauthorized'},{status:401});await connectDB();
 const p=new URL(req.url).searchParams,q=(p.get('q')||'').slice(0,100),status=p.get('status'),priority=p.get('priority');const filter:Record<string,unknown>={userId};
 if(q)filter.$or=[{title:{$regex:escapeRegex(q),$options:'i'}},{description:{$regex:escapeRegex(q),$options:'i'}}];
 if(['TODO','IN_PROGRESS','COMPLETED'].includes(status||''))filter.status=status;if(['LOW','MEDIUM','HIGH'].includes(priority||''))filter.priority=priority;
 const tasks=await Task.find(filter).sort({createdAt:-1}).lean();return NextResponse.json({tasks});
 }catch(e){console.error(e);return NextResponse.json({error:'Unable to load tasks.'},{status:500});}
}
export async function POST(req:Request){
 try{const userId=await getSessionUserId();if(!userId)return NextResponse.json({error:'Unauthorized'},{status:401});const parsed=taskSchema.safeParse(await req.json());if(!parsed.success)return NextResponse.json({error:'Invalid task data.'},{status:400});await connectDB();
 const task=await Task.create({...parsed.data,userId,dueDate:parsed.data.dueDate?new Date(parsed.data.dueDate):null});return NextResponse.json({task},{status:201});
 }catch(e){console.error(e);return NextResponse.json({error:'Unable to create task.'},{status:500});}
}