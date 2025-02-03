import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request){

    const origin=request.headers.get('origin');
    if(origin!==process.env.NEXT_PUBLIC_BASE_URL){
        return NextResponse.json({meassage:'Not allowed'},{status: 403})
    }
    const { searchParams} = new URL(request.url);
    const filename=searchParams.get('filename');
    //
    const blob=await put(filename, request.body,{
        access:'public'
    })
    // blob = {url}
    return NextResponse.json({ url: blob.url })
}