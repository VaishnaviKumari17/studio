'use client';

import { PageHeader } from '@/components/page-header';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DatabaseZap, ShieldAlert } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user?.role !== 'ADMIN') {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  const handleRefresh = () => {
    toast({
      title: 'Data Refresh Initiated',
      description: 'The IPL dataset is being refreshed. This may take a few minutes.',
    });
  };

  if (loading || !user || user.role !== 'ADMIN') {
    return (
        <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
            <ShieldAlert className="h-12 w-12 text-destructive" />
            <h2 className="mt-4 text-xl font-semibold">Access Denied</h2>
            <p className="mt-2 text-sm text-muted-foreground">
                You do not have permission to view this page.
            </p>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Panel"
        description="Manage the application data and settings."
      />
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Data Management</CardTitle>
            <CardDescription>
                Use these controls to manage the application's dataset.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <h3 className="font-semibold">Refresh IPL Dataset</h3>
                    <p className="text-sm text-muted-foreground">
                        Triggers a full refresh of the IPL data from the source.
                    </p>
                </div>
                <Button onClick={handleRefresh}>
                    <DatabaseZap className="mr-2 h-4 w-4" />
                    Refresh Data
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
