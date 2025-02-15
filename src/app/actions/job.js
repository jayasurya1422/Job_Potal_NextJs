"use server"

export  async function addJob(data,userId){
    const { title, description, location, category, salary, keywords } = data;
    const newJob = await prisma.jobListing.create({
        data: {
            title,
            description,
            location,
            category,
            salary,
            keywords,
            employerId: userId
        }
    })
    return newJob?.id
}
export async function UpdateJob(data,jobId){
    const { title, description, location, category, salary, keywords } = data;
    const updateJob = await prisma.jobListing.update({
        where: { id: jobId},
        data: {
            title,
            description,
            location,
            category,
            salary,
            keywords,
        }
    })
    return updateJob?.id
}

