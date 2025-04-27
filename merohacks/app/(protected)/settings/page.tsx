"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { JSX } from "react/jsx-runtime";
import { redirect } from "next/dist/server/api-utils";

export default function LoginSecurity(): JSX.Element {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  const userName = session?.user?.name ?? "–";
  const email = session?.user?.email ?? "–";

  const rows: { label: string; value: string }[] = [
    { label: "Name", value: userName },
    { label: "Email", value: email },
    
  ];

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 rounded-2xl border border-gray-700 text-white">
      <h1 className="text-2xl font-bold text-white mb-6">Login &amp; Security</h1>

      <div className="divide-y divide-gray-700">
        {rows.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between py-4"
          >
            <div>
              <p className="text-sm font-medium text-gray-400">{label}</p>
              <p className="mt-1 text-lg text-white">{value}</p>
            </div>
           
          </div>
           
        ))}
      </div>
      <Button className="flex items-center justify-center" variant="outline" size="sm" >
           Edit
      </Button>
    </div>
  );
}
