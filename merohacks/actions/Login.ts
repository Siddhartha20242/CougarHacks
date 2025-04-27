/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"
import * as z from 'zod';
import { loginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/route';
import {AuthError} from 'next-auth'

import { sendVerificationEmail } from '@/lib/mail';

import { generateVerificationToken } from '@/lib/tokens';
import { getUserByEmail } from '@/data/user';




export const login = async (values: z.infer<typeof loginSchema>) => {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success){
        return{error: "Invalid Fields!"};
    }

    const {email, password} = validatedFields.data;
    
    const existingUser = await getUserByEmail(email);

    if (!existingUser || ! existingUser.email  || !existingUser.password){
        return{error: "Email doesnot exists!"}
    }

    if (!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(
            existingUser.email);


        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return {success: "Confirmation Email Sent"};


    }
    
    try{
        await signIn("credentials", {
            email,
            password, 
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    }
    catch(error){
        if (error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {Error: "Invalid Credentials!"}
                default:
                    return {error: "Something went wrong"}
            }
        }
        throw error;

    }

}


























