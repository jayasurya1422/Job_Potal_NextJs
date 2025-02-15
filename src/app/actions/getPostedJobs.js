"use server"

import { getAuthAccount } from "@/lib/auth"
import { prisma } from "@/lib/prisma";

export default async function getPostedJobs(){
    const session = await getAuthAccount();
    const jobs = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { 
            jobListings: {
                select: {
                    id: true,
                    title: true,
                    numApplications: true,
                    location: true,
                }
            }
        }
    })
    return jobs;

}