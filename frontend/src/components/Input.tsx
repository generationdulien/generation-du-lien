import React from "react";
import { Input as ShadcnInput } from "./ui/input.js";
import { Label } from "./ui/label.js";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Wrapper around shadcn Input + Label with error and helper text support.
 * Maintains forwardRef for react-hook-form compatibility.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <Label htmlFor={inputId} className="text-sm font-medium">
            {label}
          </Label>
        )}
        <ShadcnInput
          ref={ref}
          id={inputId}
          className={className}
          aria-invalid={!!error}
          {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
