import Link from "next/link";
import {Briefcase} from "lucide-react"
export default function Navbar(){
    const user_role='EMPLOYER';
    const navbarConfig={
        
        JOB_SEEKER:[
            {title:'All Jobs',url:'/jobs'},
            {title:'My applications',url:'/applications'},
        ],
        EMPLOYER: [
            {title:'Add a Job',url:'/add-job'}
        ]
    }
    return <header className="w-full px-10 py-3 flex justify-between border-b">
        <h4 className="font-bold text-lg flex items-center gap-2"><Briefcase/>Job Portal</h4>
        {user_role ? <div className="space-x-3">
            {
                navbarConfig[user_role].map(each=> {
                    return <Link href={each.url}>
                        {each.title}
                    </Link>
                })
            }
        </div>
        :
        <Link href="/sign-in">Sign-in</Link> }
    </header>
}