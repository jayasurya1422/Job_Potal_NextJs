import { getSingleJobData } from '@/app/actions/getSingleJobData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ViewsCounter from '@/components/ViewsCounter';
import formatMoney from '@/utils/formatMoney';
import { Calendar, Eye, FileCheck, Globe, IndianRupee, MailIcon, MapPin, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react'


const fetchJobData = async (id) =>{
  return await getSingleJobData(id);
}

export async function generateMetadata({ params }) {
  const {id} = await params;
  const job=await fetchJobData(params.id);
  return {
    title: job.title,
    description: `Job Hiring for : ${job.description.substring(0,40)}`
  }
}
async function SingleJobPage({params}) {
  const { id } = params; // Correct way to access `id`
    const job=await fetchJobData(id);
    if(job===null) return (
      <section>
        Failed to grab data
      </section>
    )
    return (
        <div className='grid grid-cols-12 gap-5'>
         {/* {JSON.stringify(data,null,2)} */}
         <Card className="col-span-12 md:col-span-9 p-px md:p-3">
            <CardHeader className="p-4 md:p-6">
              <h1 className='text-2xl md:text-5xl font-bold'>{job.title}</h1>
              <h5 className='text-lg'>{job.employer.name}</h5>
            </CardHeader>
            <CardContent className="p-4 md:pt-6 md:pb-0">
              <div className='grid md:grid-cols-2 gap-4'>
                  <div className='flex items-center gap-1 font-semibold'>
                  <MapPin/>
                  {job.location}
                  </div>
                  <div className='flex items-center gap-1 font-semibold'>
                  <IndianRupee/>
                  {formatMoney(job.salary)}
                  </div>
                  <div className='flex items-center gap-1 font-semibold'>
                  <Eye/>
                    <ViewsCounter id={job.id}/>
                  </div>
                  <div className='flex items-center gap-1 font-semibold'>
                  <FileCheck/>
                  {job.numApplications} Applications
                  </div>
              </div>
              <Link href={`/apply/${job.id}`} className='mt-6 text-white font-semibold  flex items-center  gap-2 w-full bg-black justify-center py-3 rounded-lg'>Apply Now</Link>
            </CardContent>
            <CardContent className="p-2 md:p-6" >
              <div className='overflow-x-auto py-1'>
                <h5 className='font-semibold  text-lg pb-2 pt-2'>Skills needed:</h5>
              {
                job.keywords.map(e=>{
                  return <span className='bg-black mx-1 rounded-full py-1 px-4 text-white'>
                    {e}
                  </span>
                })
              }
              </div>
              <h5 className='font-semibold  text-lg pb-2 pt-5'>Job Description</h5>
              <p dangerouslySetInnerHTML={{__html: job.description.replaceAll(/\n/g,'<br />')}}></p>
        
            </CardContent>
         </Card>
         <Card className="col-span-12 md:col-span-3 p-px md:p-3">
              <CardHeader>
                <CardTitle>
                  Company Details
                </CardTitle>
              </CardHeader>
              <CardContent className="w-full">
                <Link className="text-2xl font-bold"href={`/company/${job.employer.id}`}>
                {job.employer.name}
                </Link>
                <p className='text-lg text-gray-800'>{job.employer.tagline}</p>
                <div className='w-full px-2 my-5  h-[0.4px] bg-gray-300'/>
                <div className='flex  gap-1 items-center py-3'>
                  <Calendar/>
                  {job.employer.founded}
                </div>
                <div className='flex  gap-1 items-center py-3'>
                  <Users/>
                  {job.employer.size}
                </div>
                <div className='flex  gap-1 items-center py-3'>
                  <Globe/>
                  <a href={job.employer.website}>
                  {job.employer.website}
                  </a>
                </div>
                <Link href={`mailto:${job.employer.email}`} className='text-white font-semibold  flex items-center  gap-2 w-full bg-black justify-center py-3 rounded-lg'>
                  <MailIcon/> Email Company</Link>
                </CardContent>

         </Card>
        </div>
    );
}
export default SingleJobPage