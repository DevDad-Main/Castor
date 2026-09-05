"use client"

import {
  ClerkProvider,
  useAuth,
  UserButton,
} from "@clerk/nextjs"
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ThemeProvider } from "@/components/theme-provider"
import { UnauthenticatedView } from "@/features/auth/components/unauthenticated-view"
import { AuthLoadingView } from "@/features/auth/components/auth-loading"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Authenticated>
            <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-end p-4 md:p-6">
              <div className="pointer-events-auto">
                <UserButton />
              </div>
            </div>
            {children}
          </Authenticated>
          <Unauthenticated>
            <UnauthenticatedView />
          </Unauthenticated>
          <AuthLoading>
            <AuthLoadingView />
          </AuthLoading>
        </ThemeProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
