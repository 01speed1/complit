import BaseIcon from "./BaseIcon";

type CompletedIconProps = {
  className?: string;
};

export default function BookmarkStartIcon({
  className,
}: CompletedIconProps): JSX.Element {
  return <BaseIcon className={className} icon="ri-bookmark-3-fill" />;
}
