'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { z } from "zod"
const loginSchema = z.object({
    email:z.string().min(1, {message:"Email is required"}),
    password:z.string().min(6, {message:"Password is required"})
  })

const defaultValues = {
 email: '',
 password: '',
};

export async function login(values: z.infer<typeof loginSchema>) {
 try {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
   return {
    message: 'validation error',
    errors: validatedFields.error.flatten().fieldErrors,
   };
  }

  const {email, password} = validatedFields.data;
  
  await signIn('credentials', {email, password, redirectTo:'/protected'});

  return {
   message: 'success',
   errors: {},
  };
 } catch (error) {
  if (error instanceof AuthError) {
   switch (error.type) {
    case 'CredentialsSignin':
     return {
      message: 'credentials error',
      errors: {
       ...defaultValues,
       credentials: 'incorrect email or password',
      },
     };
    default:
     return {
      message: 'unknown error',
      errors: {
       ...defaultValues,
       unknown: 'unknown error',
      },
     };
   }
  }
  throw error;
 }
}

export async function logout() {
 await signOut();
}