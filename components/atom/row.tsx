import { TContainerRender } from "@comptypes/type";
import { cn } from "components/cn";
import React from "react";

interface RowProps extends React.ObjectHTMLAttributes<HTMLDivElement> {
  as?: TContainerRender;
}

const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ className, children, as, ...props }, ref) => {
    const Component = as || "div";
    return (
      <Component className={cn("flex flex-row items-center", className)} ref={ref} {...props}>
        {children}
      </Component>
    );
  }
);
Row.displayName = "Row";

export { Row };
