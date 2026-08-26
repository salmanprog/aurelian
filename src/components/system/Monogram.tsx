export function Monogram({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M24 4 4 44h9.4L24 21.6 34.6 44H44L24 4Z" fill="currentColor" />
      <path d="M17.4 34.4h13.2" stroke="#B69A62" strokeWidth="1.6" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-ui text-[13px] font-normal uppercase leading-none tracking-[0.52em] ${className}`}
    >
      Aurelian
    </span>
  );
}
