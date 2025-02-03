import React from 'react'
import {Briefcase} from "lucide-react"
import AuthForm from '@/components/AuthForm'

function SignUp() {
  return (
    <section className='w-full h-screen flex justify-center items-center'>
        <AuthForm origin = "signUp"/>
    </section>
  )
}

export default SignUp