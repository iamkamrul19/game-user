import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-white/20 animate-pulse rounded-[6px]", className)}
      {...props}
    />
  );
}

export { Skeleton };
