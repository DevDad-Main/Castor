import { inngest } from "@/inngest/client"
import { generateText } from "ai"
// import { google } from "@ai-sdk/google"
import { createAnthropic } from "@ai-sdk/anthropic"

const anthropic = createAnthropic({
  headers: { "anthropic-workspace-id": "wrkspc_01KAZC2pP4HdaQz91Xnd2n3M" },
})

export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },
  async ({ event, step }) => {
    await step.run("generate-text", async () => {
      // CLAUDE
      return await generateText({
        model: anthropic("anthropic/claude-opus-4.8"),
        prompt: "Write a vegetarian lasagna recipe for 4 people.",
      })
      // GEMINI
      // return await generateText({
      //   model: google("gemini-3.6-flash"),
      //   prompt: "Write a vegetarian lasagna recipe for 4 people.",
      // })
    })
  }
)
