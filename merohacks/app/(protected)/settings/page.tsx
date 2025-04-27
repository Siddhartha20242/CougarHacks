"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginSecurity() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-gray-400">Loading…</p>
      </div>
    );
  }

  const userName = session?.user?.name ?? "–";
  const email = session?.user?.email ?? "–";

  const rows = [
    { label: "Name",  value: userName },
    { label: "Email", value: email   },
  ];

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 rounded-2xl border border-gray-700 text-white">
      <h1 className="text-2xl font-bold mb-6">Login &amp; Security</h1>

      <div className="divide-y divide-gray-700">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium text-gray-400">{label}</p>
              <p className="mt-1 text-lg">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ← ONLY one child (the <Link>), and valid size="sm" */}
      <Button asChild variant="outline" size="sm" className="flex ">
        <Link href="/home">back</Link>
      </Button>
    </div>
  );
}
