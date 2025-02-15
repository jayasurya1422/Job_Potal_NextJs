import { getAuthAccount } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function POST(request){
    const { name, slug, email, resumeUrl, desc,tagline, location, founded, size, website} = await request.json();

    const session= await getAuthAccount();
    if(!session || !session.user){
        return NextResponse.json({status : "Sign in please"},{status : 403})
    }
    const company = await prisma.user.findUnique({
        where: { id: session.user.id }
    })
    if(!company){
        return NextResponse.json({ status: "Company not found"}, { status: 404})
    }
    try {
        const updatedCompany = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name,
                slug,
                email,
                image: resumeUrl,
                tagline,
                desc,
                founded,
                location,
                size,
                website
            }
            
        })
        return NextResponse.json({ updatedCompany }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ status: error.message}, { status: 500})
    }
    
}