export default function CallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
