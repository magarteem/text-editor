export const CompletedTasksTag = ({
  total,
  completed,
}: {
  total?: number;
  completed?: number;
}) => {
  return (
    <span className="rounded-lg py-1 bg-blue-bright-highlight text-blue-marian text-xs px-2 font-bold tracking-wide">
      {`${completed}/${total}`}
    </span>
  );
};
