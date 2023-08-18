export function LoadingIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      fill="none"
      viewBox="0 0 25 24"
      className={className}
    >
      <g clipPath="url(#clip0_607_10)">
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16.25 3.75A9.094 9.094 0 0121.5 12a9 9 0 01-18 0 9.094 9.094 0 015.25-8.25"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_607_10">
          <path fill="#fff" d="M0 0H24V24H0z" transform="translate(.5)"></path>
        </clipPath>
      </defs>
    </svg>
  )
}
