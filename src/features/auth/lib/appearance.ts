"use client"

import { dark, shadcn } from "@clerk/themes"
import type { SignIn } from "@clerk/nextjs"

type AuthAppearance = React.ComponentProps<typeof SignIn>["appearance"]

export const authAppearance: AuthAppearance = {
  theme: [shadcn, dark],
  layout: {
    socialButtonsVariant: "iconButton",
    socialButtonsPlacement: "bottom",
    showOptionalFields: false,
  },
  variables: {
    colorPrimary: "oklch(0.72 0.16 262)",
    colorBackground: "oklch(0.187 0.016 264)",
    colorText: "oklch(0.92 0.004 264)",
    colorTextSecondary: "oklch(0.68 0.012 264)",
    colorInputBackground: "oklch(0.225 0.014 264)",
    colorInputText: "oklch(0.95 0.002 264)",
    colorBorder: "oklch(0.3 0.016 264)",
    colorDanger: "oklch(0.704 0.191 22.216)",
    borderRadius: "0.625rem",
    fontFamily:
      "var(--font-inter), ui-sans-serif, system-ui, -apple-system, sans-serif",
    fontFamilyButtons:
      "var(--font-inter), ui-sans-serif, system-ui, -apple-system, sans-serif",
  },
  elements: {
    rootBox: "justify-content: center",
    cardBox: "box-shadow: none",
    card: {
      boxShadow:
        "0 40px 120px -40px rgba(0, 0, 0, 0.9), 0 0 0 1px oklch(0.3 0.016 264)",
      borderRadius: "1rem",
      background: "oklch(0.205 0.014 264)",
    },
    header: "display: none",
    dividerLine: { background: "oklch(0.3 0.016 264)" },
    formFieldInput:
      "transition: border-color 150ms ease, box-shadow 150ms ease",
    formButtonPrimary: {
      background: "oklch(0.72 0.16 262)",
      color: "oklch(0.05 0.004 264)",
      fontWeight: 600,
      height: "44px",
      boxShadow: "none",
      "&:hover": {
        background: "oklch(0.78 0.16 262)",
        boxShadow: "none",
      },
    },
    footerActionLink: {
      color: "oklch(0.72 0.16 262)",
      fontWeight: 500,
    },
    socialButtonsIconButton: {
      borderColor: "oklch(0.3 0.016 264)",
      background: "oklch(0.225 0.014 264)",
    },
    formFieldError: {
      color: "oklch(0.704 0.191 22.216)",
    },
  },
}