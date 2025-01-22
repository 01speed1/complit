interface PendingIconProps {
  className?: string;
}

export default function PendingIcon({
  className,
}: PendingIconProps): JSX.Element {
  return <i className={`ri-progress-1-line ${className}`}></i>;
}
