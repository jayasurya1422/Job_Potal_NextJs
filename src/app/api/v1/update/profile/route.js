import { getAuthAccount } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(request){
    const {name, email,bio,slug,resume,salary,keywords}=await request.json();
    const session = await getAuthAccount();
    
    if(!session) return NextResponse.json({message: "reject"},{status: 401} );

    try {
        const saved = await prisma.user.update({
            where : {id: session?.user.id},
            data : {
                name,
                email,
                bio,
                slug,
                resume,
                salary,
                skills : keywords
    
            }
        })
    } catch (error) {
        console.error(error.message);
    }
    return NextResponse.json({success:true})
}