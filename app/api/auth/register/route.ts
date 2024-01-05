import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// @ts-ignore
export async function POST(req, res) {
	try {
        const payload = await req.json()

        const hashedPassword = await bcrypt.hash(payload.password, 10)

		const existingUser = await db.user.findUnique({
			where: {
				email: payload.email,
			},
		})

		if (existingUser) {
			return NextResponse.json({ error: 'User already exists' })
		}

		const newUser = await db.user.create({
			data: {
				name: payload.name,
				email: payload.email,
				password: hashedPassword,
			},
		})

		return NextResponse.json({ newUser: newUser })
	} catch (err: any) {
		return NextResponse.json({ error: err.message })
	}
}
