import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

/** ✅ Simple + Useful Hebrew Prompts */
export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "איך מגדירים יומן?",
    prompt: "איך מגדירים ומנהלים יומן במערכת?",
    icon: "calendar",
  },
  {
    label: "הפקת חשבונית/קבלה",
    prompt: "איך מפיקים חשבונית או קבלה במערכת?",
    icon: "receipt",
  },
];

/** ✅ Hebrew Placeholder */
export const PLACEHOLDER_INPUT = "כתבו כאן שאלה…";

/** ✅ Hebrew Greeting */
export const GREETING = "שלום 👋 איך אפשר לעזור?";

/** ✅ Keep theme simple and Medform-colored */
export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  color: {
    accent: {
      primary: "#1B2A59", // Medform navy
      level: 1,
    },
  },
  radius: "round",
});
