const Logo = ({ className = "", size = 36 }) => {
  const height = size;
  const width = size * (200 / 90);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="CD logo"
      role="img"
    >
      <path
        d="M18 45 L40 8 L72 8 L72 18 L48 18 L30 45 L48 72 L72 72 L72 82 L40 82 Z"
        fill="currentColor"
      />
      <path d="M108 8 L96 82 L104 82 L116 8 Z" fill="currentColor" />
      <path
        d="M182 45 L160 8 L128 8 L128 18 L152 18 L170 45 L152 72 L128 72 L128 82 L160 82 Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Logo;
