"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex flex-col items-center w-full gap-y-2"> {/* Changed to flex-col */}
      <Button
        size="lg"
        className="w-full flex items-center justify-center border border-gray-300 rounded-md shadow-sm" // Added border and shadow
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5 mr-2" />
        Google
      </Button>
      <Button
        size="lg"
        className="w-full flex items-center justify-center border border-gray-300 rounded-md shadow-sm" // Added border and shadow
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5 mr-2" />
        GitHub
      </Button>
    </div>
  );
};