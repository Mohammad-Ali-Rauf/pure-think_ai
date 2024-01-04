'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { signIn, useSession } from 'next-auth/react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { signUpSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import bcrypt from 'bcryptjs'

import * as z from 'zod'
import { db } from '@/lib/db'

const SignupPage = () => {
	const { data: session, status } = useSession()
	const { push } = useRouter()
	const [loading, setLoading] = useState(false)

	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	useEffect(() => {
		if (status === 'authenticated' && session && !loading) {
			setLoading(true)
			push('/dashboard')
			setLoading(false)
		} else {
			setLoading(false)
		}
	}, [session, status, push, loading])

	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
				<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Sign Up and{' '}
							<span className='font-extrabold text-blue-600'>Get Started</span>
						</h1>
						<Form {...form}>
							<form
								noValidate
								className='space-y-4 md:space-y-6'
								onSubmit={form.handleSubmit(async ({ name, email, password }) => {
									const hashedPassword = bcrypt.hash(password, 10)

									const existingUser = await db.user.findUnique({
										where: {
											email,
										},
									})

									if (existingUser) {
										return form.setError('email', {
											type: 'manual',
											message: 'Email already in use.',
										})
									}

									await db.user.create({
										data: {
											name,
											email,
											password: hashedPassword,
										}
									})

									// TODO: Send email verification
								})}
							>
								<FormField
									control={form.control}
									name='name'
									render={({ field, fieldState, formState }) => (
										<FormItem>
											<FormLabel
												htmlFor='name'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Your Name
											</FormLabel>
											<Input
												{...field}
												type='text'
												name='name'
												id='name'
												className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
												placeholder='John Doe'
												required
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='email'
									render={({ field, fieldState, formState }) => (
										<FormItem>
											<FormLabel
												htmlFor='email'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Your Email
											</FormLabel>
											<Input
												{...field}
												type='email'
												name='email'
												id='email'
												className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
												placeholder='john.doe@example.com'
												required
											/>
											<FormDescription>We will <b>never</b> share it with third parties.</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='password'
									render={({ field, fieldState, formState }) => (
										<FormItem>
											<FormLabel
												htmlFor='password'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Password
											</FormLabel>
											<Input
												{...field}
												type='password'
												name='password'
												id='password'
												className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
												placeholder='●●●●●●'
												required
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='confirmPassword'
									render={({ field, fieldState, formState }) => (
										<FormItem>
											<FormLabel
												htmlFor='confirmPassword'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Confirm Password
											</FormLabel>
											<Input
												{...field}
												type='password'
												name='confirmPassword'
												id='confirmPassword'
												className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
												placeholder='●●●●●●'
												required
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									disabled={form.formState.isSubmitting}
									type='submit'
									className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
								>
									Sign Up
								</Button>

								{form.formState.isSubmitted && (
									<AlertDialog>
									<AlertDialogTrigger>{form.formState.isSubmitted}</AlertDialogTrigger>
									<AlertDialogContent>
									  <AlertDialogHeader>
										<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
										<AlertDialogDescription>
										  This action cannot be undone. This will permanently delete your account
										  and remove your data from our servers.
										</AlertDialogDescription>
									  </AlertDialogHeader>
									  <AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction>Continue</AlertDialogAction>
									  </AlertDialogFooter>
									</AlertDialogContent>
								  </AlertDialog>
								  
								)}

								<div className='flex flex-col sm:flex-row gap-3'>
									<Button
										className='w-full'
										size='xl'
										variant='outline'
										onClick={async () => await signIn('github')}
									>
										<FaGithub className='mr-2 text-lg' />
										<span className='sm:flex hidden'>GitHub</span>
									</Button>
									<Button
										className='w-full'
										size='xl'
										variant='outline'
										onClick={async () => await signIn('google')}
									>
										<FcGoogle className='mr-2 text-lg' />
										<span className='sm:flex hidden'>Google</span>
									</Button>
								</div>
								<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
									Already have an account?{' '}
									<Link
										href='/sign-in'
										className='font-medium text-blue-600 hover:underline dark:text-blue-500'
									>
										Login here
									</Link>
								</p>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</section>
	)
}

export default SignupPage
