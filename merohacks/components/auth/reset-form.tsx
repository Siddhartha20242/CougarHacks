"use client";

import * as z from 'zod';
import { ResetSchema } from '@/schemas';
import { useForm } from 'react-hook-form';

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CardWrapper } from "./card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from '../ui/button';
import { FormError } from '../FormError';
import { FormSuccess } from '../formSuccess';

import { reset } from '@/actions/reset';


import { useState, useTransition } from 'react';


export const ResetForm = () => {
    
    

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            reset(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                });
        });

      
    };

    return (
        <div>
            <CardWrapper
                headerLabel="Forgot your password"
                backButtonLabel="Back to Login?"
                backButtonHref="/auth/login" // Changed this line
               
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
                                                placeholder="mail@example.com" type="email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button disabled={isPending} type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-black-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                           Send Reset Email
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    );
};