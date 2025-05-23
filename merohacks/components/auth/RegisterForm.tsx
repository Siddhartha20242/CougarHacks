"use client";

import * as z from 'zod'
import { RegisterSchema } from '@/schemas';
import {useForm} from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import { CardWrapper } from "./card-wrapper"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button';
import { FormError } from '../FormError';
import { FormSuccess } from '../formSuccess';
import { register} from '@/actions/Register';

import { useState, useTransition } from 'react';



export const RegisterForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState <string | undefined>("");

    const[isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("");
        
        
        
        startTransition(() => {
            register(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);

            })
        })
      
    } 

    return (
        <div>
        <CardWrapper

        headerLabel="Hi, Cougar! Create an Account"
        backButtonLabel="You already have an account?"
        backButtonHref="/auth/login"
        showSocial

        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">

                    <div className="space-y-4">







                    <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                        disabled={isPending}
                                        placeholder="Aryan Jung Thapa" type="name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                        disabled={isPending}
                                        placeholder="abastola1@caldwell.edu" type="email" />
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        







                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>


                     <Button disabled={isPending} type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-black-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                        Create an Account
                    </Button>
                </form>

            </Form>

        </CardWrapper></div>
    )

}