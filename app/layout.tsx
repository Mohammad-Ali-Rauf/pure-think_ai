import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'
import { getServerSession } from 'next-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'PureThink AI',
	description: 'Created, designed, and developed by Mohammad Ali',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession()
	return (
		<html lang='en'>
			<body className={inter.className}>
				<SessionProvider session={session}>{children}</SessionProvider>
			</body>
		</html>
	)
}
