import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// @ts-ignore
export async function POST(req, res) {
	try {
        const payload = await req.json()

		const existingUser = await db.user.findUnique({
			where: {
				email: payload.email,
			},
		})

		if (existingUser) {
			return NextResponse.json({ existingUser })
		}

		return NextResponse.json({ message: 'User not found.' })
	} catch (err: any) {
		return NextResponse.json({ error: err.message })
	}
}
