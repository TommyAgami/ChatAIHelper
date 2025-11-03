"use client";

import { useCallback } from "react";
import { ChatKitPanel } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function App() {
  const { scheme } = useColorScheme();

  const handleResponseEnd = useCallback(() => {
    // You may log or trigger something when AI finishes responding
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-end bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-5xl">
        <ChatKitPanel
          theme={scheme}
          onResponseEnd={handleResponseEnd}
        />
      </div>
    </main>
  );
}
