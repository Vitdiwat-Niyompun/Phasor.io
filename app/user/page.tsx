import { Suspense } from "react";
import { AuthButton } from '@/components/auth-button';
import UserManagement from '@/components/UserManagement';

export default function Home() {



  return (
    <main className="min-h-scrseen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="font-semibold">Hello App</div>
            <Suspense fallback={<div>Loading.jjjj..</div>}>
        <AuthButton />
      </Suspense>
          </div>
        </nav>
        <UserManagement />

        

        <footer className="w-full flex items-center justify-center border-t py-16">Footer</footer>
      </div>
    </main>
  );
}