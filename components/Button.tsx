import { cva, VariantProps } from 'class-variance-authority'

import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react'


const buttonClasses = cva(
    [
        "rounded-3xl",
        "font-bold",
        "hover:scale-110",
        "active:scale-100",
        "transition",
        "duration-200",
        "ease-in-out",
    ],
    {
        variants: {
            intent: {
                primary: [
                    "bg-violet-500",
                    "text-white",
                    "border-transparent",
                    "hover:bg-violet-600",
                ],

                secondary: [
                    "bg-white",
                    "text-black",
                    "border-gray-400",
                    "hover:bg-gray-100",
                    "border-solid",
                    "border-2",
                    "border-gray-800",
                ],
                text: ["bg-transparent", "text-black", "hover:bg-gray-100"],
            },
            size: {
                small: ["text-md", "py-1", "px-2"],
                medium: ["text-lg", "px-6", "py-2"],
                large: ["text-xlg", "px-8", "py-4"],
            },
        },
        defaultVariants: {
            intent: "primary",
            size: "medium",
        },
    }
);


/*
type ButtonProps = {
    intent: "primary" | "secondary" | "text"
    size: "small" | "medium" | "large"
} & ComponentPropsWithoutRef<'button'>
 */


type ButtonProps = VariantProps<typeof buttonClasses> & ComponentPropsWithoutRef<'button'>

const Button = ({
    children,
    className,
    intent,
    size,
    ...props
}: PropsWithChildren<ButtonProps>): JSX.Element => {
    return (
        <button
            className={buttonClasses({ intent, size, className })} {...props}
        >
            {children}
        </button>
    )
}

export default Button