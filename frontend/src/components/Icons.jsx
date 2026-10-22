const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export const SearchIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const ChevronIcon = (p) => (
  <svg {...base} width={16} height={16} strokeWidth={2.5} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const MoonIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);

export const SunIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const PlusIcon = (p) => (
  <svg {...base} width={28} height={28} strokeWidth={2.5} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const CheckIcon = (p) => (
  <svg {...base} width={16} height={16} strokeWidth={3} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const PencilIcon = (p) => (
  <svg {...base} width={18} height={18} {...p}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

export const TrashIcon = (p) => (
  <svg {...base} width={18} height={18} {...p}>
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="m19 6-1 14H6L5 6" />
    <path d="M10 11v5M14 11v5" />
  </svg>
);

export const EmptyIllustration = (p) => (
  <svg
    width="132"
    height="132"
    viewBox="0 0 132 132"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <rect x="30" y="22" width="72" height="92" rx="8" />
    <path d="M52 22v-4a6 6 0 0 1 6-6h16a6 6 0 0 1 6 6v4" />
    <path d="M46 52h40M46 68h40M46 84h22" strokeOpacity=".55" />
  </svg>
);
