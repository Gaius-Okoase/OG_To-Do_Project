import zod from 'zod';

export const RegisterSchema = zod.object({
    firstName: zod.string({
        error: (iss) => iss.input === undefined ? `Please provide your first name.` : `First name should be a string.`
    }).trim(),
    lastName: zod.string({
        error: (iss) => iss.input === undefined ? `Please provide your last name.` : `First name should be a string.`
    }).trim(),
    email: zod.email({
        error: (iss) => iss.input === undefined ? `Please provide your email.` : `Please provide a valid email address.`
    }).trim(),
    password: zod.string({
        error: (iss) => iss.input === undefined ? `Please provide a password.` : `Password should be a string.`
    }).min(8, 'Password must be at least 8 characters.')
});

export const LoginSchema = zod.object({
    email: zod.email({
        error: (iss) => iss.input === undefined ? `Please provide your email.` : `Please provide a valid email address.`
    }).trim(),
    password: zod.string({
        error: (iss) => iss.input === undefined ? `Please provide a password.` : `Password should be a string.`
    }).min(8, 'Password must be at least 8 characters.')
});