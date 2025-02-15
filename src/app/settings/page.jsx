import CompanySettingsPage from '@/components/pages/company-settings-page';
import UserSettingsPage from '@/components/pages/user-settings-page';
import { getAuthAccount } from '@/lib/auth'
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import React from 'react'

async function SettingsPage() {
    const session= await getAuthAccount();
    if(!session || !session.user) return notFound();
    const user = await prisma.user.findUnique({
        where : {id: session.user.id},
        select : {role:true}
    })
    if(!user)
        return redirect('/sign-in')
    
    if(user.role=="EMPLOYER"){
        const preloadData = await prisma.user.findUnique({
            where : {id:session.user.id},
            select: { 
                name: true,
                slug: true,
                email: true,
                image: true,
                role: true,
                tagline: true,
                desc: true,
                founded: true,
                size: true,
                website: true,
                location: true
            }
        })
        return <CompanySettingsPage preloadData = {preloadData}/>
    } else if(user.role=="JOB_SEEKER"){
        const user= await prisma.user.findUnique({
            where : {id: session.user.id},
            select : {
                name : true,
                slug : true,
                email : true,
                bio:true,
                resume : true,
                skills : true,
                salary : true,
                experiences:true
            }
        })
        return <UserSettingsPage user={user}/>
    } else notFound();
}

export default SettingsPage