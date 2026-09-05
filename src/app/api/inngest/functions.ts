import { inngest } from "@/inngest/client"
import { generateText } from "ai"
// import { google } from "@ai-sdk/google"
import { createAnthropic } from "@ai-sdk/anthropic"
import { firecrawl } from "@/lib/firecrawl"

const anthropic = createAnthropic({
  headers: { "anthropic-workspace-id": "wrkspc_01KAZC2pP4HdaQz91Xnd2n3M" },
})

const URL_REGEX = /https:?:\/\/[^\s]+/g

export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },
  async ({ event, step }) => {
    const { prompt } = event.data as { prompt: string }

    // Extract all URLS from the users query
    const urls = (await step.run("extract-urls", async () => {
      return prompt.match(URL_REGEX) ?? []
    })) as string[]

    //  Scrape the content from the URLS the user passed
    const scrapedContent = await step.run("scrape-urls", async () => {
      const results = await Promise.all(
        urls.map(async (url) => {
          const result = await firecrawl.scrape(url, {
            formats: ["markdown"],
          })
          return result.markdown ?? null
        })
      )
      return results.filter(Boolean).join("\n\n")
    })

    // FORMAT the final prompt with the scraped content if there is any
    const finalPrompt = scrapedContent
      ? `Context:\n${scrapedContent}\n\nQuestion: ${prompt}`
      : prompt

    await step.run("generate-text", async () => {
      // CLAUDE
      return await generateText({
        model: anthropic("anthropic/claude-opus-4.8"),
        prompt: finalPrompt,
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      })
      // GEMINI
      // return await generateText({
      //   model: google("gemini-3.6-flash"),
      //   prompt: "Write a vegetarian lasagna recipe for 4 people.",
      // })
    })
  }
)

export const demoError = inngest.createFunction(
  { id: "demo-error" },
  { event: "demo/error" },
  async ({ step }) => {
    await step.run("fail", async () => {
      throw new Error("Inngest Error: Background job failed!")
    })
  }
)
