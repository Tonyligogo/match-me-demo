import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import { loginSchema } from './lib/schemas/LoginSchema'
import { getUserByEmail } from './app/actions/authActions';
import { compare } from 'bcryptjs';

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            name: 'credentials',
            async authorize(creds) {
                const validated = loginSchema.safeParse(creds);

                if (validated.success) {
                    const { email, password } = validated.data;

                    const user = await getUserByEmail(email);

                    if (!user || !user.passwordHash || !(await compare(password, user.passwordHash))) return null;

                    return {
                        ...user,
                        zodiac: user.member?.zodiac || null,
                      };
                }

                return null;
            }
        })
    ],
} satisfies NextAuthConfig