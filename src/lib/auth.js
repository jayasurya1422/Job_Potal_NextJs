import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (!user || !account) return false;

            const existingUser = await prisma.user.findUnique({
                where: { email: user.email },
                include: { accounts: true },
            });

            if (existingUser) {
                const hasSameProvider = existingUser.accounts.some(acc => acc.provider === account.provider);
                
                if (!hasSameProvider) {
                    // Link the new provider with the existing user
                    await prisma.account.create({
                        data: {
                            userId: existingUser.id,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                            type: account.type,
                            access_token: account.access_token,
                            refresh_token: account.refresh_token,
                            expires_at: account.expires_at,
                            id_token: account.id_token,
                            token_type: account.token_type,
                        },
                    });
                }
            }

            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email },
                    include: { accounts: true },
                });

                if (dbUser) {
                    token.id = dbUser.id;
                    token.name = dbUser.name;
                    token.email = dbUser.email;
                    token.role = dbUser.role;
                    token.image = dbUser.image;
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.image;
                session.user.role = token.role;
            }
            return session;
        },

        redirect() {
            return "/onboarding";
        },
    },
};


export const getAuthAccount = () => getServerSession(authOptions)