/**
 * Nadeem Tour & Travels emblem — gold globe rings, meridians and an ascending
 * aircraft. Rendered inline (no network fetch) so it is crisp at any size.
 */
export default function BrandLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Nadeem Tour & Travels — globe and aircraft emblem"
    >
      <defs>
        <linearGradient id="brand-gold-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0e0b0" />
          <stop offset="0.5" stopColor="#d9ba68" />
          <stop offset="1" stopColor="#b8933f" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="50" fill="none" stroke="url(#brand-gold-grad)" strokeWidth="4.5" />
      <circle cx="60" cy="60" r="40" fill="none" stroke="#d9ba68" strokeWidth="1.2" opacity="0.55" />
      <ellipse cx="60" cy="60" rx="5.5" ry="32" fill="none" stroke="url(#brand-gold-grad)" strokeWidth="1.7" opacity="0.6" />
      <ellipse cx="60" cy="60" rx="27" ry="3.6" fill="none" stroke="url(#brand-gold-grad)" strokeWidth="1.7" opacity="0.5" />
      <g transform="translate(74 46) rotate(52)" fill="url(#brand-gold-grad)">
        <path d="M0 -12 L5 1 L16.5 5 L7.2 8.6 L4.8 14.5 L2.1 9.2 L0 10.6 L-2.1 9.2 L-4.8 14.5 L-7.2 8.6 L-16.5 5 L-5 1 Z" />
      </g>
      <circle cx="27" cy="85" r="3" fill="#e6cf8c" />
      <circle cx="93" cy="76" r="2" fill="#e6cf8c" opacity="0.75" />
    </svg>
  );
}
