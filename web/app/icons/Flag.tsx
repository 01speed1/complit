import BaseIcon from "./BaseIcon";

type CompletedIconProps = {
  className?: string;
};

export default function FlagIcon({
  className,
}: CompletedIconProps): JSX.Element {
  return <BaseIcon className={className} icon="ri-flag-2-fill" />;
}
