interface ErrorBoxProps {
  message: string;
}

const Message = ({ message }: ErrorBoxProps) => {
  return (
    <div className="w-full rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
      <p className="font-medium">Something went wrong</p>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default Message;
