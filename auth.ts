import NextAuth from 'next-auth';
import {PrismaAdapter} from "@auth/prisma-adapter"
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import prisma from './prisma/client';
import bcrypt from 'bcrypt'

async function getUser(email:string) {
 const user = await prisma.user.findUnique({
    where:{email:email}
 })
    return user
}

export const {
 auth,
 signIn,
 signOut,
 handlers
} = NextAuth({
    adapter:PrismaAdapter(prisma),
 ...authConfig,
 providers: [
  Credentials({
   name: 'credentials',
   credentials: {
    email: {},
    password: {},
   },
   async authorize(credentials) {
      const {email, password} = credentials;
    const user = await getUser(email as string);
    if(!user || !user.password) return null;
const pwMatch = await bcrypt.compare(password as string, user.password)

if(pwMatch) {
   return user 
}else {
   return null
}

   
   },
  }),
 ],
});