// app/settings/editinformation/page.tsx
"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditInformation() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Prefill once session is loaded
  useEffect(() => {
    if (status === "authenticated") {
      setName(session.user?.name ?? "");
      setEmail(session.user?.email ?? "");
    }
  }, [status, session]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      router.push("/settings");
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-gray-400">Loading…</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 rounded-2xl border border-gray-700 text-white">
      <h1 className="text-2xl font-bold mb-6">Edit Your Information</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name field */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="mt-1 w-full"
          />
        </div>

        {/* Email field */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Email
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 w-full"
          />
        </div>

        <Button
          type="submit"
          variant="outline"
          size="sm"
          className="w-full"
          disabled={isSaving}
        >
          {isSaving ? "Saving…" : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
