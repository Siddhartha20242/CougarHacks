"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"; // Assuming you have a Card component
import { Header } from "@/components/auth/header";
import { Social } from "./Social";
import { BackButton } from "./back-button";

interface CardWrapperProps{
    children: React.ReactNode;      // This allows us to pass any other React Elements (like our actual form elements, input fields, buttons) as children within the <CardWrapper> tags when we use it. 
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) => {
    return (
        <Card className=" my-50 w-[400px] shadow-md">
            
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>



            <CardContent>
                {children}
            </CardContent>

            {showSocial && (
                <CardFooter>
                    <Social/>

                </CardFooter>
            )}
            <CardFooter>
                <BackButton
                label={backButtonLabel}
                href={backButtonHref}>

                </BackButton>
            </CardFooter>


        
        </Card>
    );
};

// In this file we are just creating a resusable react component CardWrapper. This component acts
// as a consistent container or layout structure for different authentication-related forms or content within
// our application(like login, registration, forgot password, etc).










































