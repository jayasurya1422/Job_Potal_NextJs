"use client"
import React, { useEffect, useState } from 'react'

function ViewsCounter({id}) {
    const [views, setViews]=useState(null);

    useEffect(()=>{
        async function fetchViews(){
            try {
                const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/inc/${id}`);
            if(res.ok){
                const viewsResponse=await res.json();
                setViews(viewsResponse.data);
            }
            } catch (error) {
                console.error(error.message," error");

            }
        }
        fetchViews();
    },[id])
  return (
    <div>
        
        {views} {views<=1?'view':'views'}
    </div>
  )
}

export default ViewsCounter