"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useChatKit } from "@openai/chatkit-react";
import {
  STARTER_PROMPTS,
  PLACEHOLDER_INPUT,
  GREETING,
  CREATE_SESSION_ENDPOINT,
  WORKFLOW_ID,
  getThemeConfig,
} from "@/lib/config";
import type { ColorScheme } from "@/hooks/useColorScheme";

// auto detect text direction
function detectDirection(text: string): "rtl" | "ltr" {
  return /[\u0590-\u05FF]/.test(text) ? "rtl" : "ltr";
}

export type FactAction = {
  type: "save";
  factId: string;
  factText: string;
};

type ChatKitPanelProps = {
  theme: ColorScheme;
  onWidgetAction: (action: FactAction) => Promise<void>;
  onResponseEnd: () => void;
  onThemeRequest: (scheme: ColorScheme) => void;
};

export function ChatKitPanel({
  theme,
  onWidgetAction,
  onResponseEnd,
  onThemeRequest,
}: ChatKitPanelProps) {
  const processedFacts = useRef(new Set<string>());
  const isMountedRef = useRef(true);

  const [isInitializingSession, setIsInitializingSession] = useState(true);

  // session creation
  const getClientSecret = useCallback(async () => {
    const response = await fetch(CREATE_SESSION_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workflow: { id: WORKFLOW_ID },
        chatkit_configuration: { file_upload: { enabled: true } },
      }),
    });

    const raw = await response.text();
    const data = raw ? JSON.parse(raw) : {};

    if (!response.ok || !data.client_secret) {
      throw new Error("Failed to initialize chat session.");
    }

    return data.client_secret as string;
  }, []);

  const chatkit = useChatKit({
    api: { getClientSecret },
    theme: { colorScheme: theme, ...getThemeConfig(theme) },
    startScreen: { greeting: GREETING, prompts: STARTER_PROMPTS },
    composer: { placeholder: PLACEHOLDER_INPUT, attachments: { enabled: true } },
    onResponseEnd,
    onThreadChange: () => processedFacts.current.clear(),
  });

  const control = chatkit.control;
  const messages = control?.messages ?? [];

  const isReady =
    control &&
    control.thread &&
    Array.isArray(messages);

  useEffect(() => {
    if (!isReady && isInitializingSession) {
      setTimeout(() => setIsInitializingSession(false), 300);
    }
  }, [isReady]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-[90vh] text-gray-400 bg-white dark:bg-slate-900">
        טוען שיחה...
      </div>
    );
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const text = (new FormData(form).get("message") as string)?.trim();
    if (!text) return;

    control.sendMessage({ text });
    form.reset();
  };

  return (
    <div className="relative flex flex-col h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-sm">

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => {
          const dir = detectDirection(msg.text);
          const isUser = msg.role === "user";

          return (
            <div
              key={index}
              className={`max-w-[75%] px-3 py-2 rounded-xl whitespace-pre-wrap break-words ${
                isUser
                  ? "bg-[#DCF8C6] ml-auto text-right"
                  : "bg-[#F1F1F1] mr-auto text-right"
              }`}
              style={{
                direction: dir,
                unicodeBidi: "plaintext",
              }}
            >
              {msg.text}
            </div>
          );
        })}
      </div>

      {/* INPUT BAR */}
      <form onSubmit={sendMessage} className="p-3 border-t flex gap-2 bg-white dark:bg-slate-900">
        <input
          name="message"
          placeholder="הקלד הודעה…"
          className="flex-1 border rounded-lg px-3 py-2 bg-white dark:bg-slate-800 dark:text-white"
          style={{ direction: "rtl", textAlign: "right" }}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          שלח
        </button>
      </form>
    </div>
  );
}

