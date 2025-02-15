import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const {id}=await params;
    try {
        const listing=await prisma.jobListing.findUnique({
            where:{id}
        })
        if(!listing) return NextResponse.json({status:'Listing Not found'},{status:404});
        const updatedListing=await prisma.jobListing.update({
            where:{id},
            data:{
                views:{
                    increment:1
                },
            },
            select:{
                views:true
            }
        })
        return NextResponse.json({status:"Incremented",data:updatedListing.views},{status:200})  



    } catch (error) {
        return NextResponse.json({status:"failed to Increment"},{status:500})

    }
}
