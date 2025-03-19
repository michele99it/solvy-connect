
import { SVGProps } from "react";

interface SolvyLogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const SolvyLogo = ({ size = 22, className = "", ...props }: SolvyLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Horizontal S logo, closely resembling the Solvy logo */}
      <path d="M20 9c0-1.5-1-2-3-2H7c-2 0-3 .5-3 2 0 1.5 1 2 3 2h10c2 0 3 .5 3 2s-1 2-3 2H7c-2 0-3-.5-3-2" />
      <path d="M16 6c-1 0-4 .5-5 2M8 18c1 0 4-.5 5-2" />
    </svg>
  );
};

export default SolvyLogo;
