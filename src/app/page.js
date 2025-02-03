import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {Briefcase, MapPin , Search} from "lucide-react"
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <section className="flex flex-col gap-2 items-center justify-center h-[70vh] bg-black text-center px-4">
        <h1 className="text-white text-2xl sm:text-4xl lg:text-6xl font-bold tracking-tighter">Find your Dream Job Today</h1>
        <p className="text-gray-200 text-lg">Discover thousands of oppurtunities on GeekJOBs and get hired</p>
        <div className="flex items-center gap-2 mt-5">
          <Input placeholder="Search for Jobs.."className="bg-gray-100"/>
          <Button className="bg-gray-700"variant="">Search</Button>
        </div>

      </section>
        
      <section className=" h-screen sm:h-[50vh] px-8 w-full flex flex-col items-center justify-center gap-3 bg-zinc-300">
      <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-center tracking-tighter">Featured Jobs</h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            [
              {title:'Product Manager',companyName:'Google',Location:'NY, USA', jobUrl:'/apply/demo-job'},
              {title:'Senior Software Engineer',companyName:'Microsoft',Location:'Germany', jobUrl:'/apply/sse'},
              {title:'CXO - Executive',companyName:'Startup Demo',Location:'India', jobUrl:'/apply/demoo'}
            ].map((job)=> {
              return <Card className="pt-4">
                <CardContent>
                <h3 className="text-lg font-medium">{job.title}</h3>
                <h6 className="text-md">{job.companyName}</h6>
                <p className=" flex items-center gap-1 pt-2 pb-2"><MapPin size="16"/>{job.Location}</p>
                </CardContent>
                <CardFooter>
                <Link className="border border-gray-700 w-full px-4 py-2 rounded-lg text-center bg-gray-200/40" href={job.jobUrl}>Apply now</Link>
                </CardFooter>
                </Card>
            })
          }
        </div>
      </section>
      <section className="bg-zinc-900 text-white h-auto py-10 items-start flex flex-col px-10 sm:px-20 py-20">
        <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-center tracking-tighter">
          Join thousands of Job seekers today!
        </h2>
        <p>
          Ready to start yourjourney with GeekJobs? Sign up for the newsletter to stay updated!
        </p>
        <div className="flex items-center gap-2 mt-5">
          <Input placeholder="Enter your email"className="bg-gray-100"/>
          <Button className="text-black"variant="outline">Subscribe</Button>
        </div>
      </section>

      <section className="p-4 h-screen sm:h-[50vh] px-8 w-full flex flex-col items-center justify-center gap-3 ">
        <h4 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-center tracking-tighter">How it works</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {
            [
              {title:'Search a Job',description:'Browse through thousands of high quality jobs around the world',icon:Search},
              {title:'Apply with ease',description:'With single click and auto profile import apply faster',icon:Search},
              {title:'Grow in career',description:'Take your career to the very next level with GeekJobs',icon:Briefcase}
            ].map((each)=>{
              return <div>
                  <Card>
                    <CardHeader>
                      <each.icon/>
                    </CardHeader>
                    <CardContent>
                      <h4>{each.title}</h4>
                      <p>{each.description}</p>
                    </CardContent>
                  </Card>
              </div>
            })
          }
        </div>
      </section>
    </>
  );
}
