'use client'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {}

const Dashboard = (props: Props) => {
	const { data: session, status } = useSession()
	const { push } = useRouter()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (status === 'unauthenticated' && !session && !loading) {
      setLoading(true)
			push('/sign-in')
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
			<div>
				<Button onClick={() => signOut()} size='lg' variant='secondary'>
					sign out
				</Button>
			</div>
		)
	}
}

export default Dashboard
