import { ArrowUpIcon, MessageSquareTextIcon, SparkleIcon } from "lucide-react"

const SUGGESTIONS = [
  "Explain my current selection",
  "Fix the lint errors",
  "Help me write a test",
  "Review the latest changes",
]

export const CopilotPanel = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3.5 py-4">
        <span className="font-mono text-[10px] tracking-wide text-zinc-500 uppercase">
          Suggested
        </span>
        <div className="mt-3 flex flex-col gap-1">
          {SUGGESTIONS.map((prompt) => (
            <button
              key={prompt}
              className="hover:bg-landing-card/80 hover:text-zinc-100 group flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-zinc-300 transition-colors"
            >
              <SparkleIcon className="size-3.5 shrink-0 text-twin/70 transition-opacity opacity-0 group-hover:opacity-100" />
              {prompt}
            </button>
          ))}
        </div>

        <div className="mt-auto flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <MessageSquareTextIcon className="text-zinc-600 size-8" />
          <div className="flex flex-col gap-0.5">
            <span className="text-zinc-200 text-sm font-medium">
              No messages yet
            </span>
            <span className="text-zinc-500 text-xs">
              Ask about this workspace and the answers will show up here.
            </span>
          </div>
        </div>
      </div>

      <div className="border-landing-line/60 shrink-0 border-t p-3">
        <div className="border-landing-line/80 bg-landing/60 flex items-center gap-2 rounded-md border px-2.5 py-2">
          <span className="flex-1 text-sm text-zinc-500">Ask Castor…</span>
          <button
            aria-label="Send message"
            className="text-zinc-400 hover:bg-landing-card hover:text-zinc-100 grid size-6.5 cursor-pointer place-items-center rounded-md transition-colors"
          >
            <ArrowUpIcon className="size-4" strokeWidth={2} />
          </button>
        </div>
        <p className="font-mono text-[10px] text-zinc-600 mt-1.5 px-0.5">
          ⌘K to search · ⌥⏎ to send
        </p>
      </div>
    </div>
  )
}
