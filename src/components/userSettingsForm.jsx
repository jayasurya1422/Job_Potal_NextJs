"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import {X, x} from "lucide-react";

function UserSettingsForm({onSave,preloadedData}) {
    const [keywordWriten,setKeywordWrite]=useState('');
    const initialKeywords=useMemo(()=>{
        return preloadedData.skills || [];
    })
    const [keywords,setKeywords]=useState(initialKeywords);
    const preloadedExperiences = useMemo(()=>{
        return preloadedData.experiences || [
            {
                companyName : '',
                role : '',
                startDate : new Date(Date.now()),
                endDate : new Date(Date.now()),
                description : ""
    
            }
        ]
    },[preloadedData])
    const [experiences,setExperiences]=useState(preloadedExperiences);

    const [resumeUrl,setResumeUrl] = useState(preloadedData.resume || null)
    const { 
        register,
        handleSubmit,
        setValue
    } = useForm({
        defaultValues: {
            name: preloadedData.name || '',
            email : preloadedData.email || '',
            slug : preloadedData.slug || '',
            bio: preloadedData.bio || '',
            salary : preloadedData.salary || '',
            keywords : preloadedData.skills  || '',
            resume : preloadedData.resume || '',
        }
    });

    useEffect(()=>{
        console.log(preloadedData)
    },[preloadedData])
    
    const onSubmit= async (data)=>{
        await onSave({...data,experiences});
    }

    useEffect(()=>{
        console.log(preloadedData);
    },[preloadedData])

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

    const addExperience = () => {
        setExperiences([...experiences, {
            companyName : '',
            role : '',
            startDate : new Date(Date.now()),
            endDate :  new Date(Date.now()),
            description : '',
        }
    ])
    }
    const removeExperience = (indexToRemove) => {
        const tempExp=experiences.filter((_,index)=> index !== indexToRemove)
        setExperiences(tempExp);

    }
    const handleExperienceChange = (index,field,value) => {
        const tempExp = [...experiences];
        tempExp[index] = {...tempExp[index],[field]:value};
        setExperiences(tempExp);
        console.log(experiences);
    }
    
  return (
    <Card>
        <CardHeader>

        </CardHeader>
        <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                    <div >
                        <label className='text-sm' htmlFor="name">Your Name</label>
                        <Input placeholder="John DOe." {...register('name')} id="name"/>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="email">Your Email</label>
                        <Input placeholder="user@site.com" {...register('email')} id="email"/>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="slug">Choose a slug</label>
                        <Input placeholder="/yourname" {...register('slug')} id="slug"/>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="bio">Your Bio</label>
                        <Input placeholder="e.g. I'm the best developer" {...register('bio')} id="bio"/>
                    </div>
                    <div>
                        <label className='text-sm'>Resume</label>
                        <label>
                            <div className='border-2 border-dashed border-gray-300 rounded-lg h-10 w-full flex justify-center items-center'>{resumeUrl?"change your Resume":"Upload your Resume"}</div>
                            <input onChange={handleResumeChange} type="file" accept='application/pdf' hidden/>
                        </label>
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
                        <label className='text-sm' htmlFor="salary">Your expected salary</label>
                        <Input placeholder="eg. 100000" {...register('salary')} id="salary"/>
                    </div>
                    <div className='experience-field space-y-3'>
                        <h5 className='text-md'>Add your experiences:</h5>
                            {experiences?.map((exp,index)=>{
                                return <div key={exp.id} className='flex flex-col gap-2 border p-2 rounded-lg bg-gray-200/10'>
                                    <div className='flex space-x-2'>
                                    <Input 
                                    placeholder="Company Name"
                                    value={exp.companyName}
                                    onChange={(e)=>handleExperienceChange(index,'companyName',e.target.value)}
                                    />
                                    <Input 
                                    placeholder="Your Role"
                                    value={exp.role}
                                    onChange={(e)=>handleExperienceChange(index,'role',e.target.value)}
                                    />
                                    </div>
                                    <div className='flex space-x-2'>
                                    <Input 
                                    placeholder="Joining Date"
                                    type="date"
                                    defaultValue={new Date(exp.endDate).toISOString().split('T')[0]}
                                    onChange={(e)=>handleExperienceChange(index,'startDate',e.target.value)}
                                    />
                                    <Input 
                                    placeholder="End Date"
                                    type="date"
                                    defaultValue={new Date(exp.endDate).toISOString().split('T')[0]}
                                    onChange={(e)=>handleExperienceChange(index,'endDate',e.target.value)}
                                    />
                                    </div>
                                    <Input 
                                    placeholder="Description about job role"
                                    className="block"
                                    value={exp.description}
                                    onChange={(e)=>handleExperienceChange(index,'description',e.target.value)}
                                    />
                                <Button variant="destructive" type="button" onClick={()=>removeExperience(index)}>
                                    Remove Experience
                                </Button>
                                </div>
                            })}
                            <Button type="button"  onClick={addExperience}>
                                Add Job experience
                            </Button>
                    </div>
                <Button type="submit">
                    Save
                </Button>
            </form>
        </CardContent>
    </Card>
  )
}

export default UserSettingsForm