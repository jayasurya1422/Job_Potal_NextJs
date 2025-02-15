import { Card, CardFooter, CardTitle } from '@/components/ui/card';
import { getAuthAccount } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

async function MyApplications() {
    const session = await getAuthAccount();
    if(!session || !session.user) return notFound();
    const applications= await prisma.jobApplication.findMany({
        where: {
            applicantId: session.user.id
        },
        select:{
            appliedAt:true,
            status:true,
            jobListing:{
                select:{
                    title:true,
                    id:true,
                }
            }
        }

    })

  return (
    <div className='p-4 w-full'>
        <div className='w-full flex flex-col gap-3'>
            {
                applications.map(e => {
                    return(
                        <Card className='p-4'>
                            <CardTitle className='text-2xl font-semibold'>
                                {e.jobListing.title}
                            </CardTitle>
                            <CardFooter className='p-0 flex justify-between'>
                                <div className='flex flex-col gap-2'>
                                <span>Status of Application: <p className='font-semibold'>{e.status}</p></span>
                                    <span>
                                        Applied at:{new Date(e.appliedAt).toLocaleDateString('en-In',{day:'numeric',month:"short",year:"numeric"})}
                                        
                                    </span>
                                </div>
                                <Link className='bg-black p-3 rounded text-white' href={`/jobs/${e.jobListing.id}`}>
                                        View Job
                                    </Link>

                            </CardFooter>
                        </Card>
                    )
                })
            }

        </div>
    </div>
  )
}

export default MyApplications