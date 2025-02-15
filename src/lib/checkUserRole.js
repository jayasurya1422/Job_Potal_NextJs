import { prisma } from "./prisma";

export default async function checkUserRole(userId){
 const user=await prisma.user.findUnique({
    where : {id:userId},
    select : {role : true}
 })   
 return user.role
}