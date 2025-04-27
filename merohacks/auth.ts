import NextAuth from "next-auth"
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { db } from "./lib/db";

import {PrismaAdapter} from '@auth/prisma-adapter'; // This allows us to connect NextAuth to our prisma database, allowing NextAuth to store user accounts, sessions
import authConfig from "./auth.config";                

import { getUserById } from "./data/user";      // This imports the getUserbyid from the folder data
import { UserRole } from "@prisma/client";   



export const{handlers: {GET, POST}, auth,signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/login",  // A client-side function to initiate the signin flow with a specific provider. 
        error: '/auth/error',    // Specifies the Url of our custom error page that redirects here if there's an error

    },  


    events: { // This is for accounts linked with things like Google or Github
         async linkAccount({user}){
            await db.user.update({
                where: {id: user.id},       // Here it updates the emailVerified to new Date
                data: {emailVerified: new Date()}
            })
         }

    },
    callbacks: {
        async signIn({user, account}) {

            // Allow OAuth without email verification
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id);




            // Prevent signin without email verification
            if (!existingUser?.emailVerified) return false;

            

            return true;
        },

        async session({token, session}){
            if (token.sub && session.user){
                session.user.id = token.sub
            }

            if (token.role && session.user){
                session.user.role = token.role as UserRole;
            }




             return session
        },
        async jwt({token}){
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            token.role = existingUser.role;


            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig,
});
 
// Clear database -> npx prisma migrate database
// After that npx prisma db push
