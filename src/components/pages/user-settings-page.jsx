"use client"

import React from 'react'
import UserSettingsForm from '../userSettingsForm'
import { useToast } from '@/hooks/use-toast'

function UserSettingsPage({user}) {
  const {toast} = useToast();
  const onSave = async (data) => {
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/update/profile`,{
      method: 'POST',
      body: JSON.stringify(data)
    })
    if(res.ok){
        const response=await res.json();
        if(response.success){
          toast({
            title:"Saved!!"
          })
        }
    } else{
      toast({
        title:"Uh Oh!",
        descrption : "Saving failed.",
        variant :"destructive"
      })
    }
  }
  return (
    <div className='p-8 w-full min-h-[80vh] gap-3 flex flex-col justify-center items-center'>
      <h1 className='text-xl font-bold'>Update your Profile</h1>
        <div className='w-full sm:w-1/2 mx-auto'>
        <UserSettingsForm onSave={onSave} preloadedData= {user}/>
        </div>
    </div>
  )
}

export default UserSettingsPage