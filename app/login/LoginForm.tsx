"use client"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import { login } from "@/lib/actions";
import {z} from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email:z.string().min(1, {message:"Email is required"}),
  password:z.string().min(6, {message:"Password is required"})
})

export function LoginForm() {
  const router = useRouter();
// 1. Define your form.
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:"",
      password:"",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
   try {
      await login(values) // server action
   } catch (error) {
    console.log(error)
   }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormDescription>
                This is your email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormDescription>
                Password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
       
        <Button type="submit">Login</Button>
      </form>
      <div className="my-2">
        <Link href='/register'>If you don&apos;t have account ? <Button variant="link">create new account</Button></Link>
        </div>
    </Form>
  )
}
