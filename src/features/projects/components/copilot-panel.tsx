import { ArrowUpIcon, MessageSquareTextIcon } from "lucide-react"

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
        <span className="text-muted-foreground px-1 text-xs font-medium">
          Suggested
        </span>
        <div className="mt-2 flex flex-col gap-0.5">
          {SUGGESTIONS.map((prompt) => (
            <button
              key={prompt}
              className="hover:bg-accent/60 text-foreground cursor-pointer rounded-md px-2 py-1.5 text-left text-sm transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="mt-auto flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <MessageSquareTextIcon className="text-muted-foreground/50 size-8" />
          <div className="flex flex-col gap-0.5">
            <span className="text-foreground text-sm font-medium">
              No messages yet
            </span>
            <span className="text-muted-foreground text-xs">
              Ask about this workspace and the answers will show up here.
            </span>
          </div>
        </div>
      </div>

      <div className="border-border/60 shrink-0 border-t p-3">
        <div className="border-border bg-background flex items-center gap-2 rounded-md border px-2.5 py-2">
          <span className="text-muted-foreground flex-1 text-sm">
            Ask Castor…
          </span>
          <button
            aria-label="Send message"
            className="text-muted-foreground hover:bg-accent/60 hover:text-foreground grid size-6.5 cursor-pointer place-items-center rounded-md transition-colors"
          >
            <ArrowUpIcon className="size-4" strokeWidth={2} />
          </button>
        </div>
        <p className="text-muted-foreground mt-1.5 px-0.5 text-xs">
          ⌘K to search · ⌥⏎ to send
        </p>
      </div>
    </div>
  )
}
