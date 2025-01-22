import BaseIcon from "./BaseIcon";

type CompletedIconProps = {
  className?: string;
};

export default function BookmarkStartIcon({
  className,
}: CompletedIconProps): JSX.Element {
  return <BaseIcon className={className} icon="ri-calendar-event-line" />;
}
