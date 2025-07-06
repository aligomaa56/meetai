import { Loader2 } from 'lucide-react';

export default function LoadingState({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-4 bg-muted text-foreground border border-border rounded-lg p-8 w-fit max-w-md">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          {title && <h1 className="text-xl font-semibold text-foreground">{title}</h1>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
    </div>
  );
}
