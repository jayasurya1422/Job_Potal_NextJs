import { getAuthAccount } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const validateDateRange = (startDate,endDate) => {
    if(endDate && new Date(endDate)<new Date(startDate)){
        throw new Error("End date must be after start date");
    }
}


export async function POST(request){
    const {name, email,bio,slug,resume,salary,keywords,experiences}=await request.json();
    const session = await getAuthAccount();
    
    if(!session) return NextResponse.json({message: "reject"},{status: 401} );

    try {
        if(experiences && Array.isArray(experiences)){
            for(const experience of experiences){
                validateDateRange(experience.startDate,experience.endDate);
            }
        }

        const alreadyExistingExperiences = await prisma.experiences.findMany({
            where: {userId : session.user.id}
        })

        const updates = [];
        const creations = [];
        const deletions = [];

        const incomingExperiences = new Set(experiences.map(experience=>experience.id));

        experiences.forEach((experience)=>{
            let existingExperiences;
            if(alreadyExistingExperiences){
                 existingExperiences = alreadyExistingExperiences.find(
                    (exp) => exp.id === experience.id
                )
            }
            if(existingExperiences){
                updates.push(
                    prisma.experiences.update({
                        where : { id:existingExperiences.id},
                        data : {
                            companyName: experience.companyName,
                            role : experience.role,
                            startDate : new Date(experience.startDate),
                            endDate : experience.endDate ? new Date(experience.endDate) : null,
                            description : experience.description
                        }
                    })
                )
            } else {
                creations.push(
                    prisma.experiences.create({
                        data: {
                            userId: session.user.id,
                            companyName: experience.companyName,
                            role : experience.role,
                            startDate : new Date(experience.startDate),
                            endDate : experience.endDate ? new Date(experience.endDate) : null,
                            description : experience.description
                        },
                    })
                )
            }
        })

        if(alreadyExistingExperiences){
            alreadyExistingExperiences.forEach((existingExperience)=>{
                if (!incomingExperiences.has(existingExperience.id)) {
                    // Mark for deletion if the ID is not in the incoming array
                    deletions.push(
                        prisma.experiences.delete({
                            where: { id: existingExperience.id },
                        })
                    );
                }
            })
        }

        await prisma.$transaction([...updates, ...creations, ...deletions]);


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
        return NextResponse.json({status: error.message},{status:500})
    }
    return NextResponse.json({success:true})
}