"use client"        // In the next js all of things are server components so we are telling this to use client components
import { useRouter } from 'next/navigation'; // Import from next/navigation        
 // Here we are importing the useRouter hook form nextjs which is in-built unlike react in which we have to install reactrotuer, then do the <BrowserRouter> <Routes> <Route> 


 // Interface is just for defining the structure of an object.
interface LoginButtonProps{   
    children: React.ReactNode;      // Here we are defining children as React.ReactNode meaning that it can represent any value that can be represented in ReactJSX elements.
    mode?: "modal" | "redirect",        // Union type. Mode can either be modal or redirect string literal
    asChild?: boolean;                  // 
};


export const LoginButton = ({
    children,
    mode = "redirect",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    asChild
}: LoginButtonProps) => {

    const router = useRouter();


    const OnClick = () => {
    router.push("/auth/login");

    };

    if (mode === 'modal'){
        return(
            <span>Todo:Implement Modal</span>
        )

    }

    return (
        <span onClick={OnClick} className="cursor-pointer">
            {children}
        </span>
    );

}