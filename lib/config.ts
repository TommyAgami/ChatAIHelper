import type { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "שאלה לגבי טיפולים",
    prompt: "שלום, רציתי לשאול לגבי טיפול",
    icon: "circle-question",
  },
  {
    label: "מעוניינ/ת לקבוע תור",
    prompt: "אני רוצה לקבוע תור בבקשה",
    icon: "circle-question",
  },
];

export const PLACEHOLDER_INPUT = "תשאלו על טיפול או קביעת תור";
export const GREETING = "AI מדפורם";

/**
 * ✅ This merges your theme with ChatKitStudio theme settings
 * This is the correct place — ChatKitPanel will call it automatically.
 */
export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  colorScheme: "light", // <- allows light/dark switching
  radius: "pill",
  density: "compact",
  color: {
    grayscale: {
      hue: 108,
      tint: 2,
      shade: theme === "dark" ? -1 : -4,
    },
    accent: {
      primary: "#262f5a",
      level: 1,
    },
  },
  typography: {
    baseSize: 16,
    fontFamily:
      '"OpenAI Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
    fontFamilyMono:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
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
