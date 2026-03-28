import zod from 'zod';

export const RegisterAuth = zod.object({
    firstName: zod.string('Please fill in your first name.').trim(),
    lastName: zod.string('Please fill in your last name.').trim(),
    email: zod.email('Please enter your email.').trim(),
    password: zod.string('Please enter your password').min(8, 'Password must be at least 8 characters')
})

export const LoginAuth = zod.object({
    email: zod.email('Please enter your email.').trim(),
    password: zod.string('Please enter your password').min(8, 'Password must be at least 8 characters')
})