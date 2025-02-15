import JobAddFormComponent from '@/components/job-add-form';
import { getAuthAccount } from '@/lib/auth';
import checkUserRole from '@/lib/checkUserRole';
import { notFound } from 'next/navigation';
import React from 'react'

async function AddJob() {
  const session = await getAuthAccount();
  if(!session) return notFound();

  const userRole = await checkUserRole(session.user.id)

  if(userRole !== 'EMPLOYER') return (
    <section>
      You are not authorized
    </section>
  )
  return (
    <div>
      <JobAddFormComponent userId = {session.user.id}/>
    </div>
  )
}

export default AddJob