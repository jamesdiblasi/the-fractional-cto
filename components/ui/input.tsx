import * as React from 'react';
import { cn } from '@/lib/utils';

const base =
  'flex w-full rounded-lg border border-input bg-background px-4 py-2 text-[15px] placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(base, 'h-12', className)} {...props} />
));
Input.displayName = 'Input';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(base, 'min-h-[130px] resize-y py-3', className)}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(base, 'h-12', className)} {...props} />;
}

function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn('mb-1.5 block text-sm font-semibold', className)}
      {...props}
    />
  );
}

export { Input, Textarea, Select, Label };
