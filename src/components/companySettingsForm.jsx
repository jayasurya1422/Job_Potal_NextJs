"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import {X, x} from "lucide-react";
import Image from 'next/image';

function CompanySettingsForm({onSave,preloadedData}) {
    const initialKeywords=useMemo(()=>{
        return preloadedData.skills || [];
    })
    const [keywords,setKeywords]=useState(initialKeywords);
    
   

    const [resumeUrl,setResumeUrl] = useState(preloadedData.image || null)
    const { 
        register,
        handleSubmit,
        setValue
    } = useForm({
        defaultValues: {
            name: preloadedData.name || '',
            email : preloadedData.email || '',
            slug : preloadedData.slug || '',
            desc: preloadedData.desc || '',
            location : preloadedData.location || '',
            tagline : preloadedData.tagline || '',
            size : preloadedData.size || '',
            founded : preloadedData.founded || '',
            website : preloadedData.website || '',
            
        }
    });
    const onSubmit= async (data)=>{
        await onSave({...data,resumeUrl});
    }

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

    
    
  return (
    <Card>
        <CardHeader>

        </CardHeader>
        <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                    <div >
                        <label className='text-sm' htmlFor="name">Company Name</label>
                        <Input placeholder="eg. Google" {...register('name')} id="name"/>
                    </div>
                    <div>
                        <label className='text-sm'>Logo</label>
                        <label>
                            <div >{resumeUrl?
                            <div className='space-y-2'>
                                <Image src={resumeUrl} width={40} height={40} alt='Company Logo'/>
                                <span className='text-xs pt-3'>Change your Logo</span>
                            </div>:<div className='border-2 border-dashed border-gray-300 rounded-lg h-10 w-full flex justify-center items-center'>
                                    Upload a Logo
                                </div>}</div>
                            <input onChange={handleResumeChange} type="file" accept='image/*' hidden/>
                        </label>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="email">Company Email</label>
                        <Input placeholder="admin@company.com" {...register('email')} id="email"/>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="slug">Choose a slug</label>
                        <Input placeholder="/yourname" {...register('slug')} id="slug"/>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="desc">Your Description</label>
                        <Input placeholder="e.g. I'm the best developer" {...register('desc')} id="desc"/>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="tagline">Tagline</label>
                        <Input placeholder="e.g. I'm the best developer" {...register('tagline')} id="tagline"/>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="location">Your Location</label>
                        <Input placeholder="e.g. Kolkata" {...register('location')} id="location"/>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="founded">Founded Year</label>
                        <Input placeholder="e.g. 2017, aug" {...register('founded')} id="founded"/>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="size">Company Strength</label>
                        <Input placeholder="e.g. 2000 - 2500" {...register('size')} id="size"/>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="website">Company Website</label>
                        <Input placeholder="e.g. google.com" {...register('website')} id="website"/>
                    </div>
                    
                    <div>
                        <div className='py-3 flex items-center gap-1 flex-wrap'>
                            {keywords.map((k,index)=>{
                                return <span key={k} className='px-3 py-1 mr-1 bg-black rounded-full text-white flex gap-1 items-center w-fit'>{k} 
                                <button key={index} onClick={()=>removeKeyword(index)} className='cursor-pointer'><X className='w-4 h-4 text-white'/></button>
                                </span>
                            })}
                        </div>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="salary">Your expected salary</label>
                        <Input placeholder="eg. 100000" {...register('salary')} id="salary"/>
                    </div>
                    
                <Button type="submit">
                    Save
                </Button>
            </form>
        </CardContent>
    </Card>
  )
}

export default CompanySettingsForm