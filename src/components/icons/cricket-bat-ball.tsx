import { cn } from "@/lib/utils";

export const CricketBatBallIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-6 w-6", className)}
    {...props}
  >
    <path d="m15.5 15.5 6 6" />
    <path d="M18 10c-2 2-7 7-8 8" />
    <path d="M12.5 3.5c-3 3-8 8-9 9" />
    <circle cx="6.5" cy="17.5" r="2.5" />
  </svg>
);
