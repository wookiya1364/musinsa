import { cn } from "components/cn";
import React from "react";

type TLabelRender = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";

export interface LabelProps extends React.ObjectHTMLAttributes<HTMLDivElement> {
  as?: TLabelRender;
}

const Label = React.forwardRef<HTMLDivElement, LabelProps>(
  ({ className, children, as, ...props }, ref) => {
    const Component = as || "p";
    return (
      <Component className={cn("font-medium", className)} ref={ref} {...props}>
        {children}
      </Component>
    );
  }
);
Label.displayName = "Label";

export { Label };
