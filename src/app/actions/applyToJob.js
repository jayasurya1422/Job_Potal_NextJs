"use server"

import { getAuthAccount } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function applyToJob(data, jobId) {
    const session = await getAuthAccount();
    if (!session) return { status: "Rejected" };

    const existingApplication = await prisma.jobApplication.findFirst({
        where: {
            jobListingId: jobId,
            applicantId: session.user.id,
        }
    })

    if (existingApplication) {
        return { status: "failed", message: "Already Applied" };
    }

    const result = await prisma.$transaction(async (prisma) => {
        const newApplication = await prisma.jobApplication.create({
            data: {
                jobListingId: jobId,
                applicantId: session.user.id,
                name: data.name,
                email: data.email,
                salary: data.salary,
                skills: data.keywords,
                resume: data.resume,
            }
        })

        const updateNum = await prisma.jobListing.update({
            where: { id: jobId },
            data: {
                numApplications: { increment: 1 }
            }
        })

        return { newApplication, updateNum };
    })

    return { status: "OK" };
}