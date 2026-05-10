"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Shield, X } from "lucide-react";

export function ImpersonationBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const asUser = searchParams.get("as");
  const returnTo = searchParams.get("admin_return") ?? "/admin/users";

  if (!asUser) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between bg-yellow-500 text-yellow-950 px-6 py-2.5 text-sm font-medium shadow-md">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4" />
        <span>Admin view — you are impersonating <strong>{asUser}</strong>. Changes are not saved.</span>
      </div>
      <button
        onClick={() => router.push(returnTo)}
        className="flex items-center gap-1.5 bg-yellow-900/20 hover:bg-yellow-900/30 text-yellow-950 px-3 py-1 rounded-lg transition-colors text-xs font-semibold"
      >
        <X className="w-3.5 h-3.5" /> Exit impersonation
      </button>
    </div>
  );
}
