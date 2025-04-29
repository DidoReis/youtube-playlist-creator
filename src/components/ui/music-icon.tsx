
export const MusicIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="8" cy="18" r="4" />
    <path d="M12 18V2l7 4" />
  </svg>
);

export const MusicNotesIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 18V5l12-2v13" />
    <path d="M9 18c0 2.5-1.8 3-3 3s-3-.5-3-3s1.8-3 3-3s3 .5 3 3Z" />
    <path d="M21 16c0 2.5-1.8 3-3 3s-3-.5-3-3s1.8-3 3-3s3 .5 3 3Z" />
  </svg>
);
