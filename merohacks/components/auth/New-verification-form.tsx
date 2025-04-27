'use client'
import { CardWrapper } from "./card-wrapper"
import {  useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

import { useEffect } from "react"
import { newVerification } from "@/actions/new-verification"

import {BeatLoader} from 'react-spinners'
import { FormError } from "../FormError"
import { FormSuccess } from "../formSuccess"

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const[success, setSuccess] = useState<string | undefined>();





    const searchParams = useSearchParams();

    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {

        if (success || error) return
        if (!token) {
            setError("Missing Token!");
            return
        }

        newVerification(token)
        .then((data) => {
            setSuccess(data.success);
            setError(data.error);
        })
        .catch(() => {
            setError("Something Went Wrong");
        })
        
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    // This will call the useEffect twice but hamro production ma chai ek choti matra chalchha.



    return(
        
            <CardWrapper
            headerLabel="Confirm Your verification Pleaser"
            backButtonLabel="Back to Login"
            backButtonHref="/auth/login"
            
            
            >
                <div className="flex items-center w-full justify-center">
                {!success && ! error && (
                    <BeatLoader/>
                )}
                <FormSuccess message={success}/>
                {!success && ( <FormError message={error}/>
                )}
                
               
                </div>
            </CardWrapper> 
    )
}