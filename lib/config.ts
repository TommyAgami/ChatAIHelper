import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "איזה פיצ'רים יש במדפורם",
    prompt: "מה הפיצ'רים הבולטים שלכם?",
    icon: "circle-question",
  },
];

export const PLACEHOLDER_INPUT = "כאן לכל שאלה...";
export const GREETING = "AI מדפורם כאן בשבילך";

//
// ✅ Updated theme config (merged with your new design)
//
export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  colorScheme: theme,
  radius: "pill",
  density: "compact",
  color: {
    grayscale: {
      hue: 242,
      tint: 5,
      shade: theme === "dark" ? -1 : 2,
    },
    accent: {
      primary: "#262f5a",
      level: 1,
    },
  },
  typography: {
    baseSize: 16,
    fontFamily:
      '"OpenAI Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontFamilyMono:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace',
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
});

//
// ✅ Full ChatKit Options object (use this where you initialize ChatKit)
//
import type { ChatKitOptions } from "@openai/chatkit";

export const CHATKIT_OPTIONS: ChatKitOptions = {
  api: {
    // your API connection (unchanged)
  },
  theme: getThemeConfig("light"), // or "dark"
  composer: {
    placeholder: PLACEHOLDER_INPUT,
    attachments: {
      enabled: true,
      maxCount: 5,
      maxSize: 10485760,
    },
  },
  startScreen: {
    greeting: GREETING,
    prompts: STARTER_PROMPTS,
  },
};
