"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import {X, x} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { SelectValue } from '@radix-ui/react-select';
import AddJob from '@/app/(job-forms)/add-job/page';
import { addJob,UpdateJob } from '@/app/actions/job';
import { applyToJob } from '@/app/actions/applyToJob';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


function JobApplyComponent({jobId, preloadedData}) {
    const [keywordWriten, setKeywordWrite]=useState('');
    const initialKeywords=useMemo(()=>{
        return preloadedData?.skills || [];
    },[preloadedData])
    const [keywords,setKeywords]=useState(initialKeywords);
    const [resumeUrl,setResumeUrl] = useState(preloadedData?.resume || null);
    const router= useRouter();
    const {toast} = useToast();
    const { 
        register,
        handleSubmit,
        setValue
    } = useForm({
        defaultValues: {
            name: preloadedData?.name || '',
            email: preloadedData?.email || '',
            location: preloadedData?.location || '',
            // category: preloadedData?.category || '',
            salary: preloadedData?.salary || '',
            keywords: preloadedData?.skills || [],
            resume : preloadedData?.resume || '',  
        },
    });
    async function uploadToBlobStorage(file){
        return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/upload?filename=${file.name}`,{
            method: 'POST',
            body:file
        }).then(res=>res.json())
        //
        .then(data => data.url);
    }
    const handleResumeChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const url = await uploadToBlobStorage(file);
        console.log("Uploaded Resume URL:", url); // ✅ Debugging: Check if URL is received
    
        setValue('resume', url); // ✅ Set the resume field value
        setResumeUrl(url); 
    };

    // useEffect(()=>{
    //     console.log(preloadedData)
    // },[preloadedData])
    
    const onSubmit= async (data)=>{
        console.log(data);
        try {
            const res=await applyToJob(data, jobId);
            if(res.status == "OK"){
                toast({
                
                    title: "yees",
                    description:"Applied",
                    
                })
                router.push('/my-applications');
            }
        } catch (error) {
            toast({
                
                title: "Uh oh!",
                description:"Failed to perform job",
                variant : "destructive", 
                
            })
        }
    }

    // useEffect(()=>{
    //     console.log(preloadedData);
    // },[preloadedData])

    
    const removeKeyword = (removableIndex) => {
        setKeywords((prevKeywords) => {
            const updatedKeywords = prevKeywords.filter((_, index) => index !== removableIndex);
            setValue('keywords', updatedKeywords); // Update form state
            return updatedKeywords;
        });
    };
    const handleKeywordChange =  (e) => {
        setKeywordWrite(e.target.value)
    }
    const handleOnKeydown = (e) => {
        if((e.key=="Enter" || e.key==',') && keywordWriten.trim()){
            e.preventDefault();
            const tempKeyWords = [...keywords,keywordWriten.trim()]
            setKeywords(tempKeyWords);
            setValue('keywords',tempKeyWords);
            setKeywordWrite('')
        }
    }
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setValue('category', value);
      };
    
   
    
  return (
    <Card>
        <CardHeader>

        </CardHeader>
        <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                    <div >
                        <label className='text-sm' htmlFor="name">Candidate Name </label>
                        <Input placeholder="John Doe" {...register('name')} id="name"/>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="email">Your Email</label>
                        <Input placeholder="sam@gmail.com" {...register('email')} id="email"/>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="location">Job Location</label>
                        <Input placeholder="Mumbai" {...register('location')} id="location"/>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="salary">Salary Expectations</label>
                        <Input placeholder="e.g. 6,00,000 - 8,00,000" {...register('salary')} id="salary"/>
                    </div>
                   
                    <div>
                        <div className='py-3 flex items-center gap-1 flex-wrap'>
                            {keywords.map((k,index)=>{
                                return <span key={k} className='px-3 py-1 mr-1 bg-black rounded-full text-white flex gap-1 items-center w-fit'>{k} 
                                <button key={index} onClick={()=>removeKeyword(index)} className='cursor-pointer'><X className='w-4 h-4 text-white'/></button>
                                </span>
                            })}
                        </div>
                        
                        <Input placeholder="Add a skill and press Enter"
                            type="text" value={keywordWriten} onChange={handleKeywordChange} onKeyDown={handleOnKeydown}
                        />
                    </div>
                    <div>
                        <label className='text-sm'>Resume</label>
                        <label>
                            <div className='border-2 border-dashed border-gray-300 rounded-lg h-10 w-full flex justify-center items-center'>{resumeUrl?"change your Resume":"Upload your Resume"}</div>
                            <input onChange={handleResumeChange} type="file" accept='application/pdf' hidden/>
                        </label>
                    </div>
                    
                <Button type="submit">
                    Save
                </Button>
            </form>
        </CardContent>
    </Card>
  )
}

export default JobApplyComponent