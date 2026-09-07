import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Pill buttons. Black is the default call to action; blue is for the one
 * place on the page that should shout; outline and ghost for the rest.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-secondary text-secondary-foreground hover:bg-secondary/85',
        blue: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline:
          'border border-foreground/15 bg-transparent hover:border-foreground/40',
        ghost: 'hover:bg-accent',
        link: 'text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground',
      },
      size: {
        default: 'h-11 px-5 text-[15px]',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-[52px] px-7 text-base',
        xl: 'h-14 px-8 text-base',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = 'Button';

type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants>;

function LinkButton({ className, variant, size, ...props }: LinkButtonProps) {
  return (
    <a className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { Button, LinkButton, buttonVariants };
