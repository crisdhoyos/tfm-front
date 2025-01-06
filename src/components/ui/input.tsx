import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => {
    const baseClasses = `flex 
      h-10 
      w-full 
      rounded-md 
      px-3 
      py-2 
      file:border-0 
      file:bg-transparent 
      file:text-sm 
      file:font-medium 
      file:text-gray-700 
      placeholder:text-gray-400 
      focus:outline-none 
      focus:ring-2 
      focus:ring-ring 
      focus:ring-offset-1 
      disabled:cursor-not-allowed 
      disabled:opacity-50 
      md:text-sm`;

    return (
      <input
        type={type}
        className={`${baseClasses} ${className || ""}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
