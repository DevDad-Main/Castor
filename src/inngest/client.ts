import { Inngest } from "inngest"
import { sentryMiddleware } from "@inngest/middleware-sentry"

// Creates a client to send and receive events
export const inngest = new Inngest({
  id: "castor",
  // Intercepts events and allows sentry to analazye and view when things have failed
  middleware: [sentryMiddleware()],
})
