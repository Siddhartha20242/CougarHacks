import * as z from 'zod';

export const loginSchema = z.object({           // We are just using zod here as a validator Checking if this is email, password or not. Here we are just creating the schema for js objeect.
    email: z.string().email({
        message: "Email ta chayenchha ni"               // Here, we are just checking if the email is of typestring and if not we say the message one
    }),
    password: z.string().min(1, {       // Here we are just checking if the password is of type string and should be minimum 1 character.
        message: "Password is required"
    })
});


export const ResetSchema = z.object({           // Same for the reset schema, here we are just defining the Reseat scheam to be same as email
    email: z.string().email({
        message: "Email ta chayenchha ni"
    }),
});



export const NewPasswordSchema = z.object({     // Same for thisa s well
    password: z.string().min(8, {
        message: "Password Should be At Least 8 Characters Long"
    }),
});




export const RegisterSchema = z.object({        // smae but in addition name should be of 4 minimum characters.
    email: z.string().email({
        
        message: "Email ta chayenchha ni"
    }),
    password: z.string().min(8, {
        message: "The minimum password length should be 8"
    }),
    name: z.string().min(4, {
        message: "Name is required and should be of 4 chars"
    })
});



























