import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient, Role } from "@prisma/client"
import authConfig from "./auth.config"

const prisma = new PrismaClient()

export const { auth, handlers, signIn, signOut } = NextAuth({
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.profileComplete = user.profileComplete;
                token.role = user.role;
                token.zodiac = user.zodiac;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.zodiac = token.zodiac as string;
                session.user.profileComplete = token.profileComplete as boolean;
                session.user.role = token.role as Role;
            }

            return session;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
})