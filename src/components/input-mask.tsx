import * as React from "react";
import InputMask from "react-input-mask";

import { cn } from "@/lib/utils";

const MASK_TYPE = {
  phone: "+4\\9 99 9999-9999",
  zipCode: "99999-999",
  date: "99/99/9999",
  time: "99:99",
  creditCard: "9999 9999 9999 9999",
} as const;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: keyof typeof MASK_TYPE;
}

const CustonInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mask, ...props }, ref) => {
    return (
      <InputMask
        type={type}
        mask={MASK_TYPE[mask]}
        maskChar=" "
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        // TODO: fix this ref issue
        // (property) React.ClassAttributes<ReactInputMask>.ref?: React.LegacyRef<InputMask> | undefined
        // Allows getting a ref to the component instance. Once the component unmounts, React will set ref.current to null (or call the ref with null if you passed a callback ref).
        // @see — https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={ref}
        {...props}
      />
    );
  }
);
CustonInput.displayName = "CustonInput";

export { CustonInput };
