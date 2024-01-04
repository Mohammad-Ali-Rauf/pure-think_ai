import * as z from 'zod'

export const signUpSchema = z
	.object({
		name: z.string().trim().min(3, {
			message: 'A name is required and must be at least 3 characters long.',
		}),
		email: z
			.string()
			.email({
				message: 'A valid email is required!',
			})
			.trim(),
		password: z.string().trim().min(6, {
			message: 'A password is required and must be at least 6 characters long.',
		}),
		confirmPassword: z
			.string()
			.trim()
	})
	.refine(
		(data) => {
			return data.confirmPassword === data.password
		},
		{
			message: 'Passwords must match!',
			path: ['confirmPassword'],
		}
	)

export const loginSchema = z.object({
	email: z
		.string()
		.email({
			message: 'A valid email is required!',
		})
		.trim(),
	password: z.string().trim().min(1, {
		message: 'A password is required!',
	}),
})
