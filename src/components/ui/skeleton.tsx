interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: string;
}

function Skeleton({ className = "", theme = "dark", ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-skeleton ${className}`}
      {...props}
    />
  );
}

export { Skeleton };
