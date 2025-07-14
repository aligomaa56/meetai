import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';

export const CallEnded = () => {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md">
        <Card className="text-center bg-card text-card-foreground border-border">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <div className="rounded-lg bg-accent p-4">
                <CheckCircleIcon className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <CardTitle className="text-xl text-foreground">
              Call Ended Successfully
            </CardTitle>
            
            <CardDescription className="text-sm text-muted-foreground">
              Thank you for using our meeting platform. Your session has been terminated.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Separator className="bg-border" />
            
            {/* Status Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary" className="text-xs bg-secondary text-secondary-foreground">
                  <ClockIcon className="w-3 h-3 mr-1.5" />
                  Processing Summary
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">
                The meeting summary will appear in your dashboard within a few minutes.
              </p>
            </div>

            <Separator className="bg-border" />

            {/* Action Button */}
            <div className="space-y-3">
              <Button variant="outline" asChild className="w-full h-11 font-medium bg-background text-foreground border-border">
                <Link href="/meetings">
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back to Meetings
                </Link>
              </Button>
              
              <p className="text-xs text-muted-foreground">
                You can view all your meeting summaries and recordings in the meetings dashboard.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
