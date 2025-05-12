export function Badge({ children }: { children?: React.ReactNode }) {
  return (
    <div className="text-sm bg-dark-gray px-2 py-1 border-darker-gray-2 border">
      {children}
    </div>
  );
}
