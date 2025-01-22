import BaseIcon from "./BaseIcon";

type CompletedIconProps = {
  className?: string;
};

export default function CheckIcon({
  className,
}: CompletedIconProps): JSX.Element {
  return <BaseIcon className={className} icon="ri-check-line" />;
}
