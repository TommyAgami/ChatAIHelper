"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import {
  STARTER_PROMPTS,
  PLACEHOLDER_INPUT,
  GREETING,
  CREATE_SESSION_ENDPOINT,
  WORKFLOW_ID,
  getThemeConfig,
} from "@/lib/config";
import { ErrorOverlay } from "./ErrorOverlay";
import type { ColorScheme } from "@/hooks/useColorScheme";

// Export FactAction so App.tsx can import it
export type FactAction = {
  type: "save";
  factId: string;
  factText: string;
};

const isBrowser = typeof window !== "undefined";
const isDev = process.env.NODE_ENV !== "production";

export function ChatKitPanel({
  theme,
  onWidgetAction,
  onResponseEnd,
  onThemeRequest,
}: {
  theme: ColorScheme;
  onWidgetAction: (a: FactAction) => Promise<void>;
  onResponseEnd: () => void;
  onThemeRequest: (schema: ColorScheme) => void;
}) {
  const processedFacts = useRef(new Set<string>());
  const [widgetInstanceKey, setWidgetInstanceKey] = useState(0);

  const getClientSecret = useCallback(async () => {
    const response = await fetch(CREATE_SESSION_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workflow: { id: WORKFLOW_ID },
        chatkit_configuration: { file_upload: { enabled: true } },
      }),
    });

    const data = await response.json();
    return data.client_secret;
  }, []);

  const chatkit = useChatKit({
    api: { getClientSecret },
    theme: { colorScheme: theme, ...getThemeConfig(theme) },
    startScreen: { greeting: GREETING, prompts: STARTER_PROMPTS },
    composer: {
      placeholder: PLACEHOLDER_INPUT,
      attachments: { enabled: true },
    },
    onClientTool: async (invocation) => {
      if (invocation.name === "record_fact") {
        const id = String(invocation.params.fact_id ?? "");
        const text = String(invocation.params.fact_text ?? "");

        if (!id || processedFacts.current.has(id)) return { success: true };

        processedFacts.current.add(id);
        await onWidgetAction({ type: "save", factId: id, factText: text });
        return { success: true };
      }
      return { success: false };
    },
    onResponseEnd,
  });

  // ✅ RTL auto-detection
  const isRTL = /[\u0590-\u05FF]/.test(GREETING);
  const direction = isRTL ? "rtl" : "ltr";

  return (
    <div
      data-chatkit-container
      style={{ direction }}
      className="relative pb-8 flex h-[90vh] w-full rounded-2xl flex-col overflow-hidden bg-white shadow-sm dark:bg-slate-900"
    >
      <ChatKit
        key={widgetInstanceKey}
        control={chatkit.control}
        className="block h-full w-full"
      />

      <ErrorOverlay
        error={chatkit.error}
        fallbackMessage={null}
        onRetry={() => setWidgetInstanceKey((k) => k + 1)}
        retryLabel="Restart chat"
      />
    </div>
  );
}
