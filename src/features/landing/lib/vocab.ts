export const castor = {
  tagline: "the multiplayer cloud ide · two carets, one workspace",
} as const

export const SESSION = {
  workspace: "space-station",
  file: "orbit.tsx",
  crew: [
    { name: "you", initial: "c", color: "bg-sky-400", ring: "ring-sky-400/40" },
    { name: "pollux", initial: "p", color: "bg-twin", ring: "ring-twin/50" },
    { name: "henge", initial: "h", color: "bg-violet-400", ring: "ring-violet-400/40" },
  ],
} as const

export const TICKER_ITEMS = [
  "npx castor create",
  "castor session --team",
  "castor share @pollux",
  "live cursors · all of us",
  "snap to a caret",
  "npm run preview",
  "no install · one tab",
  "lgtm — merge when green",
  "2 carets, 0 merge",
  "workspace: orbit-station",
] as const