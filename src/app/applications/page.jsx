import React from 'react'
import getPostedJobs from '../actions/getPostedJobs';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';

async function AllJobsPosted() {
    const jobs=await getPostedJobs();

  return (
    <div className='space-y-3'>
        <h1 className='text-xl md:text-4xl py-4'>Jobs posted by company</h1>
        {jobs.jobListings.map((job, index)=> { 
            return <Card className='flex items-center justify-between'>
                <CardContent className="flex flex-col  text-left items-center p-5">
                  <CardTitle className='text-lg'>{job.title}</CardTitle>
                  <p className='font-semibold'>Applicants : {job.numApplications}</p>
                  <p className='font-medium'>Location : {job.location}</p>
                </CardContent>
                <CardFooter className='space-x-3'>
                  <Link className='px-3 py-2 bg-black rounded-lg text-white' href={`/applications/${job.id}`}>View Applicants</Link>
                  <Link className='px-3 py-2 bg-black rounded-lg text-white' href={`/update-job/${job.id}`}>Update Job</Link>
                  <Link className='px-3 py-2 bg-black rounded-lg text-white' href={`/jobs/${job.id}`}>View Job</Link>
                </CardFooter>
            </Card>
        })} 
        {/* {JSON.stringify(jobs)} */}
    </div>
  )
}

export default AllJobsPosted