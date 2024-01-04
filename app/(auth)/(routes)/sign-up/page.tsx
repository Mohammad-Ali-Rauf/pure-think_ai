'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/navigation'

const SignupPage = () => {
	const { data: session, status } = useSession()
	const { push } = useRouter()
	const [loading, setLoading] = useState(false)

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
						<form className='space-y-4 md:space-y-6' action='#'>
							<div>
								<label
									htmlFor='name'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Your Name
								</label>
								<input
									type='text'
									name='name'
									id='name'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='John Doe'
									required
								/>
							</div>
							<div>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Your email
								</label>
								<input
									type='email'
									name='email'
									id='email'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='name@company.com'
									required
								/>
							</div>
							<div>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Password
								</label>
								<input
									type='password'
									name='password'
									id='password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required
								/>
							</div>
							<div>
								<label
									htmlFor='confirm-password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Confirm password
								</label>
								<input
									type='password'
									name='confirm-password'
									id='confirm-password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required
								/>
							</div>
							<button
								type='submit'
								className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
							>
								Sign Up
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
								Already have an account?{' '}
								<Link
									href='/sign-in'
									className='font-medium text-blue-600 hover:underline dark:text-blue-500'
								>
									Login here
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}

export default SignupPage
