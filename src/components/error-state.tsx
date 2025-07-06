import { AlertCircleIcon } from "lucide-react";

export default function ErrorState({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-4 bg-muted text-foreground border border-border rounded-lg p-8 w-fit max-w-md">
        <AlertCircleIcon className="h-8 w-8 text-destructive" />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          {title && <h1 className="text-xl font-semibold text-foreground">{title}</h1>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
    </div>
  );
}
