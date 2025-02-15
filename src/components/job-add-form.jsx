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
import { addJob, UpdateJob } from '@/app/actions/job';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';


function JobAddFormComponent({preloadedData,userId,jobId}) {
    const [keywordWriten,setKeywordWrite]=useState('');
    const initialKeywords=useMemo(()=>{
        return preloadedData?.keywords || [];
    })
    const [keywords,setKeywords]=useState(initialKeywords);

    const [resumeUrl,setResumeUrl] = useState(null);
    const [selectedCategory,setSelectedCategory] = useState(preloadedData?.category || '')
    const {toast} = useToast();
    const { 
        register,
        handleSubmit,
        setValue
    } = useForm({
        defaultValues: {
            title: preloadedData?.title || '',
      description: preloadedData?.description || '',
      location: preloadedData?.location || '',
      category: preloadedData?.category || '',
      salary: preloadedData?.salary || '',
      keywords: preloadedData?.keywords || [],
        }
    });

    // useEffect(()=>{
    //     console.log(preloadedData)
    // },[preloadedData])
    
    const onSubmit= async (data)=>{
        try {
            if(preloadedData){
                const res=await UpdateJob(data,jobId);
                if(res){
                    toast({
                        title: "Updated Job",

                    })
                }
            }
            else{
                const res=await addJob(data,userId);
                if(res){
                    toast({
                        title: "Added Job",
                        
                    })
                }
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
                        <label className='text-sm' htmlFor="title">Job Title</label>
                        <Input placeholder="Marketing manager" {...register('title')} id="title"/>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="description">Job Description</label>
                        <Textarea placeholder="Google is the best company" {...register('description')} id="description"/>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="location">Job Location</label>
                        <Input placeholder="Mumbai" {...register('location')} id="location"/>
                    </div>
                    <div>
                        <label className='text-sm' htmlFor="salary">Salary Range</label>
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
                            <label className='text-sm' htmlFor="category">Category</label>
                            <Select onValueChange={handleCategoryChange} value={selectedCategory}>
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Select a category"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {['Technology', 'Marketing','Finance','Health','Education'].map(each=>{
                                        return <SelectItem key={each} value={each}>{each}</SelectItem>
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                    
                <Button type="submit">
                    Save
                </Button>
            </form>
        </CardContent>
    </Card>
  )
}

export default JobAddFormComponent