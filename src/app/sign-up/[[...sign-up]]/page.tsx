import { SignUp } from "@clerk/nextjs"
import { AuthShell } from "@/features/auth/components/auth-shell"
import { authAppearance } from "@/features/auth/lib/appearance"

export default function SignUpPage() {
  return (
    <AuthShell variant="sign-up">
      <SignUp appearance={authAppearance} />
    </AuthShell>
  )
}