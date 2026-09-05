export const castor = {
  tagline: "the ai cloud ide · designed for two",
  heroShadows: ["soften the border", "explain this diff", "draft the README"],
} as const

export const TICKER_ITEMS = [
  "npx castor create",
  "castor ask \"why is 12 failing?\"",
  "⌘K agent",
  "model://anthropic/opus",
  "castor share @teammate",
  "npm run preview",
  "0 manual setup",
  "in-browser previews",
  "git push --onward",
  "a second pair of eyes",
  "castor workspace attach",
] as const

export const MODELS = [
  {
    id: "opus",
    label: "opus",
    copy: "Deep reasoning. For hard problems and long refactors.",
  },
  {
    id: "sonnet",
    label: "sonnet",
    copy: "The balance. Fast, thoughtful, right most of the time.",
  },
  {
    id: "haiku",
    label: "haiku",
    copy: "Lightning. Autocomplete and doodles on the fly.",
  },
] as const