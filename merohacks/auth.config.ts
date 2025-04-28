import bcrypt from 'bcryptjs';  // used for hashing
import Credentials from 'next-auth/providers/credentials';      // used for signing in password with usernames and other realted things
import type { NextAuthConfig } from 'next-auth';        // allows for type-safe configuration

import Github from 'next-auth/providers/github'     // IMporting github
import Google from 'next-auth/providers/google'     // Importing google

import { loginSchema } from './schemas';
import { getUserByEmail } from './data/user';


export default {
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,


        }),
        
        Credentials({
            async authorize(credentials){
                const validatedFields = loginSchema.safeParse(credentials); // Here, we are just validating the credentials by using safe parse(Analyzing the string or text)

                if (validatedFields.success){
                    const {email, password} = validatedFields.data;

                    const user = await getUserByEmail(email);

                    if (!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (passwordMatch) return user;

                }
                return null;
            }
        })
    ],
} satisfies NextAuthConfig      // It confirms to a specific type























