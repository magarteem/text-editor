export const ProfileTag = ({
  text,
  isEmpty,
}: {
  text: string;
  isEmpty?: boolean;
}) => {
  return (
    <span
      className={`text-sm px-2 bg-gray-bright rounded-lg max-w-20 text-ellipsis whitespace-nowrap ${isEmpty ? "text-grey-light" : ""}`}
    >
      {text}
    </span>
  );
};
