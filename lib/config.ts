import type { ChatKitOptions } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

/**
 * ChatKit UI + Theme Configuration (Applied in ChatKitPanel)
 * You will use this in:  <ChatKit control={chatkit.control} options={chatkitOptions} />
 */
export const chatkitOptions: ChatKitOptions = {
  theme: {
    colorScheme: "light", // Always light mode
    radius: "pill",       // Rounded UI
    density: "compact",   // Less padding = cleaner UI

    color: {
      grayscale: {
        hue: 108,
        tint: 2,
      },
      accent: {
        primary: "#262f5a", // Medform blue/navy
        level: 1,
      },
    },

    typography: {
      baseSize: 16,
      fontFamily:
        '"OpenAI Sans", Arial, Helvetica, sans-serif, system-ui, -apple-system',
      fontFamilyMono:
        'SFMono-Regular, Consolas, "Liberation Mono", monospace',

      fontSources: [
        {
          family: "OpenAI Sans",
          src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-Regular.woff2",
          weight: 400,
          style: "normal",
          display: "swap",
        },
      ],
    },
  },

  composer: {
    placeholder: "כאן לכל שאלה",
    attachments: {
      enabled: true,
      maxCount: 5,
      maxSize: 10 * 1024 * 1024, // 10MB
    },
  },

  startScreen: {
    greeting: "AI מדפורם",
    prompts: [
      {
        icon: "circle-question",
        label: "מה מדפורם עושה?",
        prompt: "תסביר לי בקצרה מה מדפורם נותנת למרפאה",
      },
      {
        icon: "chart-line",
        label: "איך מנהלים יומן?",
        prompt: "איך אני פותח יומן מרפאה חדש?",
      },
      {
        icon: "user-doctor",
        label: "תיקים רפואיים",
        prompt: "איך מוסיפים טופס רפואי למטופל?",
      },
    ],
  },
};
