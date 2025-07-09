import { Inbox } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function EmptyState({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-center min-h-96 w-full p-6">
      <Card className="w-full max-w-md text-center border-dashed">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            <div className="rounded-lg bg-muted p-4">
              <Inbox className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          {title && <CardTitle className="text-xl">{title}</CardTitle>}
          {description && (
            <CardDescription className="text-sm">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        
        <CardContent className="pt-0">
          <Separator className="mb-4" />
          <p className="text-xs text-muted-foreground">
            Get started by creating your first item
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
