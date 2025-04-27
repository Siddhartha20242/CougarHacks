"use client";

import * as z from 'zod';
import { loginSchema } from '@/schemas';        // Importing the schemas(Prototypes or blueprints) for defining the data
import { useForm } from 'react-hook-form';      // Again importing the useform from reactinbuilt
import { useSearchParams } from 'next/navigation';      // useSearchParams for allowinf to access and interact with query parameters in the URL of the current page. query parameters are that URL that comes after the ?. 
        // Why is this needed?  -> We need to display errors from external processes(like OAuth), used for redirection, passing error information and so on
import { zodResolver } from "@hookform/resolvers/zod";      // Zod is a typescript schema declaration and validation library which we are importing
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';      // Again importing components from ui
import { CardWrapper } from '@/components/auth/card-wrapper';  // Just the resuable components
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/formSuccess';
import { login } from '@/actions/Login';
import { useState, useTransition } from 'react';
import Link from 'next/link';

export const LoginForm = () => {
    const searchParams = useSearchParams();     // Allows us to access values from the URL's query string
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"  // This handles a specific scenario that might occur during OAuth Social Media login authentication
        ? "Email Already in used with different login providfers!" : "";

    const [error, setError] = useState<string | undefined>("");  // Here we are basically assigning variable named error. 
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();  // Here we are using usetransition because we have to fetch and display data that is large

    const form = useForm<z.infer<typeof loginSchema>>({     // This form will hold the variable named form and hold the object returned by the useForm hook.
        // The form data managed by useForm will have the shape and types Defined by my LoginSchema
        resolver: zodResolver(loginSchema),  
        defaultValues: {
            email: "",
            password: ""
        }
    });

    // Above we are initializing a form using the React hook Form, to manage login data according to the structure and validation rules defined 
    // in loginSchema using Zod. Deafult values for email and password are set to empty strings upon rendering of the form.

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                });
        });
    };

    // Then on the above onSubmit, is designed to handle the submission of a form login
    // form. It first clears any existing error or success messages. Then, it initializes a 
    // operation using startTransition to call the login function with the form values.

    return (
        <div>
            <CardWrapper
                headerLabel="Welcome Back Cougars"  // This is a headerLabel that will appear after the loginPage
                backButtonLabel="Don't have an account?"  // Here we are just using the backbutton as don't have an account
                backButtonHref="/auth/register" // Changed this line 
                showSocial
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field}
                                                disabled={isPending}
                                                placeholder="caldwell@example.com" type="email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field}
                                                disabled={isPending}
                                                placeholder="******" type="password" />
                                        </FormControl>
                                        <Button
                                            size="sm"
                                            asChild
                                            className="px-0 font-normal bg-red-300 color-red"
                                        >
                                            <Link href="/auth/reset">
                                                Forgot password
                                            </Link>
                                        </Button>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error || urlError} />
                        <FormSuccess message={success} />
                        <Button disabled={isPending} type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-black-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                            Login
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    );
};