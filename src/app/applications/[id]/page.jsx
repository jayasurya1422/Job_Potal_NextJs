import getSingleJobApplications from '@/app/actions/getSingleJobApplications';
import ApplicantsBox from '@/components/applicants-box';
import React from 'react'
 
async function SingleApplicationDetail({params}) {
    const {id}= await params;
    const res=await getSingleJobApplications(id);
    if(res.status === 'failed'){
      return <section>
        An error occurred
      </section>
    }
   return (
     <div>
      <h1>Applicants to Job:</h1>
      {res.applicants.map(app=>{
        return <ApplicantsBox ap={app} jobId={id}/>
      })}
      {JSON.stringify(res.applicants)}
     </div>
   )
 }
 
export default SingleApplicationDetail