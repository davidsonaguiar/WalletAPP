export function ErrorInput({ message }: { message: string }) {
  return (
    <div className="border-b p-2 border-zinc-500 text-red-500 text-sm">
      {message}
    </div>
  );
}