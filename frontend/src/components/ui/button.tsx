import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /* ✅ Primary (Whitish Light Gray) */
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground-hover",

        /* ✅ Secondary (Balanced Medium Gray) */
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover hover:text-secondary-foreground-hover",

        /* ✅ Outline (Bordered, Light Background) */
        outline:
          "border border-border bg-background text-gray-900 hover:bg-gray-100 hover:text-gray-800",

        /* ✅ Destructive (Error - Red) */
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-red-600 hover:text-white",

        /* ✅ Accent (Dark Grayish Blue) */
        accent:
          "bg-accent text-accent-foreground hover:bg-[#54586b] hover:text-accent-foreground-hover",

        /* ✅ Ghost (Minimal Button, Transparent) */
        ghost: "hover:bg-gray-100 text-gray-900",

        /* ✅ Link (Simple Underlined Text Button) */
        link: "text-gray-700 underline-offset-4 hover:underline hover:text-gray-900",
      },

      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
