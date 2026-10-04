export default function Logo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="logo-mark">
      <rect width="32" height="32" rx="8" fill="var(--ink)" />
      <path d="M10 9v14M22 9v14M10 16h12" stroke="var(--paper)" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="22" cy="9" r="3" fill="var(--signal)" />
    </svg>
  );
}
