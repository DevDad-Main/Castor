import { SignIn } from "@clerk/nextjs"
import { AuthShell } from "@/features/auth/components/auth-shell"
import { authAppearance } from "@/features/auth/lib/appearance"

export default function SignInPage() {
  return (
    <AuthShell variant="sign-in">
      <SignIn appearance={authAppearance} />
    </AuthShell>
  )
}