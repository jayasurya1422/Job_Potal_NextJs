"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { onboardingSubmission } from '../actions/onboarding'

export default function Onboarding({userId}) {
const handleOnboardingSubmission = async ({requestedRole}) => {
  const updateResponse = await onboardingSubmission({requestedRole,userId});
  console.log(updateResponse);
}

  return (
    <div className='w-full flex items-center h-[80vh] justify-center'>
      <Card className="w-full sm:w-1/3">
        <CardHeader>
          <CardTitle>Welcome to GeekJOBS</CardTitle>
          <CardDescription>Choose one which defines you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full" onClick={()=> handleOnboardingSubmission({requestedRole:"JOB_SEEKER"})}>
            I'm a Job Seeker
          </Button>
          <Button className="w-full" onClick={()=> handleOnboardingSubmission({requestedRole:"EMPLOYER"})}>
            I'm an Employer
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}