import { Logo } from "@/components/logo";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card className="shadow-2xl">
          <CardContent className="p-6">
            {children}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
