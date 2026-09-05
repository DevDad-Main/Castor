// POST localhosT:3000/api/demo/blocking
// Calls gemini api provider
import { generateText } from "ai"
// import { google } from "@ai-sdk/google"
import { NextResponse } from "next/server"
import { createAnthropic } from "@ai-sdk/anthropic"

const anthropic = createAnthropic({
  headers: { castor: process.env.ANTHROPIC_WORKSPACE_ID! },
})

export async function POST() {
  // GEMINI
  // const response = await generateText({
  //   model: google("gemini-3.6-flash"),
  //   prompt: "Write a vegetarian lasagna recipe for 4 people.",
  // })

  // CLAUDE
  const response = await generateText({
    model: anthropic("anthropic/claude-opus-4.8"),
    prompt: "Write a vegetarian lasagna recipe for 4 people.",
    experimental_telemetry: {
      isEnabled: true,
      recordInputs: true,
      recordOutputs: true,
    },
  })

  console.log(response)

  return NextResponse.json({ response })
}
