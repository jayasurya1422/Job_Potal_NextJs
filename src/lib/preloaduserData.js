import { getAuthAccount } from "./auth";



export default async function preloaduserData(){
    const session = await getAuthAccount();
    if(!session) return null;
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
    })
    return user;
}