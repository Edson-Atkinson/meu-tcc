import * as React from "react";

import { cn } from "@/app/_lib/utils";
import inputMask, { MaskTypes } from "@/app/_helpers/input-mask";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  maskType?: MaskTypes;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, maskType, onChange, ...props }, ref) => {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (maskType) {
        const mask = inputMask[maskType];
        event.currentTarget.value = mask(event);
      }

      if (typeof onChange === "function") {
        onChange(event);
      }
    }
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
