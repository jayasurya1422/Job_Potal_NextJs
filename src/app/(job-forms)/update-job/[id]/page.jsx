import JobAddFormComponent from '@/components/job-add-form';
import { getAuthAccount } from '@/lib/auth';
import checkUserRole from '@/lib/checkUserRole';
import { notFound } from 'next/navigation';
import React from 'react'

async function AddJob({params}) {
  const session = await getAuthAccount();
  if(!session) return notFound();

  const userRole = await checkUserRole(session.user.id)

  if(userRole !== 'EMPLOYER') return (
    <section>
      You are not authorized
    </section>
  )
  const {id}=params;
  const preloadedData = await prisma.jobListing.findUnique({
    where : {id}
  })
  console.log(preloadedData)
  return (
    <div>
      <JobAddFormComponent preloadedData={preloadedData} userId = {session.user.id} jobId={id}/>
    </div>
  )
}

export default AddJob