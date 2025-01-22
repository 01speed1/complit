interface BaseIconProps {
  className?: string;
  icon: string;
}

export default function BaseIcon({
  className,
  icon,
}: BaseIconProps): JSX.Element {
  return <i className={`${icon} ${className}`}></i>;
}
