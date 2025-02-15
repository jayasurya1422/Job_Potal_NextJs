"use server"

import { getAuthAccount } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function getSingleJobApplications(id){
    const session=await getAuthAccount();

    const jobListing=await prisma.jobListing.findUnique({
        where : { id},
        select : { employerId:true}
    })
    if(!jobListing || jobListing.employerId!==session.user.id){
        return {status : "failed"}
    }
    const applications=await prisma.jobApplication.findMany({
        where : {jobListingId : id},
        select :{
            status:true,
            salary :true,
            name: true,
            email : true,
            skills : true,
            resume:true,
            applicant : {
                select : {
                    id:true,
                    location :true,
                    image : true,
                    experiences : true,
                }
            }
        }
    })
    return {status : "ok",applicants:applications.map(application => ({
        status : application.status,
        salary : application.salary,
        name : application.name,
        email : application.email,
        skills : application.skills,
        resume : application.resume,
        location : application.applicant.location,
        image : application.applicant.image,
        experiences : application.applicant.experiences,
        
    }))}
}