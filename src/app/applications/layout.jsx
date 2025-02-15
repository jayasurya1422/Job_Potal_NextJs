import { getAuthAccount } from '@/lib/auth';
import checkUserRole from '@/lib/checkUserRole';
import { notFound } from 'next/navigation';
import React from 'react'

async  function LayoutOrgApplications({children}) {
    const session=await getAuthAccount();
    if(!session) return notFound();
    const role = await checkUserRole(session.user.id);
    const isAdmin ='ADMIN' == role;
    const isEmployer ='EMPLOYER' == role;

    if(!isAdmin && !isEmployer) return <section className='w-full h-screen flex justify-center items-center'>
        You are not authorized
    </section>
  return (
    <section className='p-4'>
        {children}
    </section>
  )
}

export default LayoutOrgApplications