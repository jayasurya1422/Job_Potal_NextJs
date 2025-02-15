"use server";

import { prisma } from "@/lib/prisma";


export async function getSingleJobData(jobId){
    let job=null;
    try {
        job=await prisma.jobListing.findUnique({
            where : { id : jobId},
            select : {
                id : true,
                title : true,
                description : true,
                category : true,
                location : true,
                salary : true,
                keywords:true,
                createdAt:true,
                views:true,
                numApplications:true,
                status : true,
                employer : {
                    select :{
                        id:true,
                        name : true,
                        slug:true,
                        id:true,
                        email : true,
                        founded:true,
                        size:true,
                        website : true,
                        tagline : true,
                        desc : true, 
                    }
                }
    
            }
        })
    } catch (error) {
        
    }
    return job;
}