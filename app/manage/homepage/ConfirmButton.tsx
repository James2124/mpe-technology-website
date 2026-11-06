"use client";

/** A submit button that asks for confirmation before its form is sent. */
export function ConfirmButton({
  message,
  className,
  children,
  name,
  value,
}: {
  message: string;
  className?: string;
  children: React.ReactNode;
  name?: string;
  value?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      name={name}
      value={value}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
