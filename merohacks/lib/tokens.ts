import { getVerificationTokenByEmail } from '@/data/verification-token';
import {v4 as uuidv4} from 'uuid';
import {db} from '@/lib/db';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';



export const generatePasswordResetToken = async(email: string) => {
    const token = uuidv4();     // This line calls the imported function to generate a new, unique UUID and stores it in a constant variable named token.
    const expires = new Date(new Date().getTime() + 3600 * 1000);  // It will expires afater one hour

    const existingToken = await getPasswordResetTokenByEmail(email);    //It returns a promise that resolves to either an existing password reset token object or null if no such token exists for that email

    if(existingToken){          // It checks if an existingToken was found in the previous step
        await db.passwordResetToken.delete({
            where: {id: existingToken.id}   // If yes just delete that
        });
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {     // It createes a new ticket if it is not found, and returns that as a object.
            email, 
            token, 
            expires
        }
    });
    return passwordResetToken

}


export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);
    
    if (existingToken){
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const verificationToken= await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    });

    return verificationToken;




}

// Here what we are doing is just generating new time-limited tokens for password reset and email verification, ensuring
// that only the latest token is valid by deleting any existing ones for the same email.