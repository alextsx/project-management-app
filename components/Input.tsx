import clsx from "clsx";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

const Input = ({ className, ...props } : PropsWithChildren<{
    className?  : string
} & ComponentPropsWithoutRef<'input'>>) => {
  return (
    <input
      className={clsx(
        "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
        className
      )}
      {...props}
    />
  );
};

export default Input;