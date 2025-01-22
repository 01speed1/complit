interface WorkingIconProps {
  className?: string;
}

export default function WorkingIcon({
  className,
}: WorkingIconProps): JSX.Element {
  return <i className={`ri-progress-4-line ${className}`}></i>;
}
