"use client";

import { useCallback } from "react";
import Script from "next/script"; // ✅ ADD THIS
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function App() {
  const { scheme, setScheme } = useColorScheme();

  const handleWidgetAction = useCallback(async (action: FactAction) => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[ChatKitPanel] widget action", action);
    }
  }, []);

  const handleResponseEnd = useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[ChatKitPanel] response end");
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-end bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-5xl">
        <ChatKitPanel
          theme={scheme}
          onWidgetAction={handleWidgetAction}
          onResponseEnd={handleResponseEnd}
          onThemeRequest={setScheme}
        />
      </div>

      {/* ✅ Inject CSS INTO ChatKit iframe Shadow DOM */}
      <Script id="medform-chatkit-theme" strategy="afterInteractive">
        {`
          window.addEventListener("chatkit:ready", (event) => {
            const inject = event.detail.attachCss;

            inject(\`
              html, body {
                direction: rtl !important;
                text-align: right !important;
                font-family: "Heebo", "Assistant", Arial, sans-serif !important;
              }

              .message.assistant {
                background: #F3F9FF !important;
                border-radius: 18px !important;
                border: 1px solid rgba(27,42,89,0.12) !important;
                color: #0D1B2A !important;
                padding: 12px 16px !important;
              }

              .message.user {
                background: #1B2A59 !important;
                color: white !important;
                border-radius: 18px !important;
                padding: 12px 16px !important;
              }

              textarea {
                direction: rtl !important;
                text-align: right !important;
                border-radius: 14px !important;
                border: 1px solid rgba(0,0,0,0.18) !important;
                padding: 12px 14px !important;
                font-size: 15px !important;
              }

              button[type="submit"] {
                background: #1B2A59 !important;
                color: white !important;
                border-radius: 12px !important;
                padding: 8px 14px !important;
              }
            \`);
          });
        `}
      </Script>
    </main>
  );
}
