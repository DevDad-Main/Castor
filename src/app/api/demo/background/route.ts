// POST localhosT:3000/api/demo/background
// Inngest background jobs for AI calls
import { NextResponse } from "next/server"
import { inngest } from "@/inngest/client"

export async function POST() {
  await inngest.send({
    name: "demo/generate",
    data: {},
  })

  return NextResponse.json({ status: "Started.." })
}
