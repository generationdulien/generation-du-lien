import { Button as ShadcnButton } from "./ui/button.js";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "xs" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

/**
 * Wrapper around shadcn Button with backward compatibility for custom variants.
 * Maps: primary → default, secondary → secondary, outline → outline
 */
export function Button({
  variant = "primary",
  size = "default",
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  // Map old variants to shadcn variants
  const variantMap: Record<string, "default" | "secondary" | "outline" | "ghost" | "destructive" | "link"> = {
    primary: "default",
    secondary: "secondary",
    outline: "outline",
  };

  const mappedVariant = variantMap[variant as keyof typeof variantMap] || (variant as "default" | "secondary" | "outline" | "ghost" | "destructive" | "link");

  return (
    <ShadcnButton
      variant={mappedVariant}
      size={size}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "..." : children}
    </ShadcnButton>
  );
}
