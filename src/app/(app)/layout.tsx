"use client"

import { UserButton } from "@clerk/nextjs"
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react"
import { UnauthenticatedView } from "@/features/auth/components/unauthenticated-view"
import { AuthLoadingView } from "@/features/auth/components/auth-loading"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
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
    </>
  )
}