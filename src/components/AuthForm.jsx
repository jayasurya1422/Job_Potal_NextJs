"use client";
import {Briefcase} from "lucide-react"
import { Icons } from "./icons"
import { Button } from "./ui/button"
import Link from "next/link";
import { signIn } from "next-auth/react"

export default function AuthForm({ origin = 'signIn'}){
    const handleLogin = async () => {
        try {
            await signIn("google");
        } catch (error) {
            console.error(error.message);
        }
    }
    return <div className="w-full md:w-[400px] border border-gray-200 shadow-lg flex flex-col gap-3 p-3 items-center justify-center rounded-lg">
        <Briefcase size="60"/>
        <h5 className="font-bold text-xl">{origin == 'signIn' ? "Welcome Back.." :"Welcome to GeekJobs"}</h5>
        <p>Find the best jobs around the Globe</p>
        <Button onClick={handleLogin} className="w-full">
            <Icons.Google/>
            {origin == 'signIn' ? "Sign in with Google" : "Sign up with Google"
            }
        </Button>
        {
            origin == 'signIn' ?
            <span className="flex items-center gap-2 text-sm">
                New to GeekJobs?
                <Link href="/sign-up" className="font-bold">sign up</Link>
            </span> : <span className="flex items-center gap-2 text-sm">
                Already have an account?
            <Link href="/sign-in" className="font-bold">sign in</Link>
            </span>
        }
    </div>
}