import { cn } from "@/lib/utils";

export const WicketIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M8 8v12" />
    <path d="M12 8v12" />
    <path d="M16 8v12" />
    <path d="M6 8h12" />
  </svg>
);
