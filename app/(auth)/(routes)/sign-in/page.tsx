'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'

import * as z from 'zod'
import { FieldError, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// Social Auth
import { signIn, useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'

// Icons
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const SigninPage = () => {
	const { data: session, status } = useSession()
	const { push } = useRouter()
	const [loading, setLoading] = useState(false)

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
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

	if (loading) {
		return (
			<div className='absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 '>
				<div className='border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64'></div>
			</div>
		)
	} else {
		return (
			<section className='bg-gray-50 dark:bg-gray-900'>
				<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
					<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
						<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
							<h1 className='text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white'>
								Welcome{' '}
								<span className='font-extrabold text-blue-600'>Back</span>
							</h1>
							<Form {...form}>
								<form
									noValidate
									className='space-y-4 md:space-y-6'
									onSubmit={form.handleSubmit((data) => console.log(data))}
								>
									<FormField
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
												<FormMessage />
											</FormItem>
										)}
										control={form.control}
										name='email'
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
									<button
										type='submit'
										className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
									>
										Sign In
									</button>
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
										Don&apos;t have an account yet?{' '}
										<Link
											href='/sign-up'
											className='font-medium text-blue-600 hover:underline dark:text-blue-500'
										>
											Create one
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
}

export default SigninPage
