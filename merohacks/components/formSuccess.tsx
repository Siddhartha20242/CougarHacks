"use client"
import {CheckCircledIcon} from '@radix-ui/react-icons'; // Ensure correct import path


interface FormSuccessProps {
    message?: string;
}

export const FormSuccess = ({message, }: FormSuccessProps) => {
    if (!message) return null;

    return(
        <div className="bg-emerald-500 p-3 rounded-md flex
        items-center gap-x-2 text-sm text-destructive">
            <CheckCircledIcon className='h-4 w-4' /> {/* Correct usage: self-closing */}
            <p>{message}</p>
        </div>
    )
}