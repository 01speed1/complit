interface DeleteIconProps {
  className?: string;
}

export default function DeleteIcon({
  className,
}: DeleteIconProps): JSX.Element {
  return <i className={`ri-delete-bin-line ${className}`}></i>;
}
