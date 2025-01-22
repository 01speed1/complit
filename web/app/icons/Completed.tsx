interface CompletedIconProps {
  className?: string;
}

export default function CompletedIcon({
  className,
}: CompletedIconProps): JSX.Element {
  return <i className={`ri-progress-8-line ${className}`}></i>;
}
