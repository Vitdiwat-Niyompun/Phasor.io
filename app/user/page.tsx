import UserManagement from '@/components/UserManagement';

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 flex flex-col items-center">
      <UserManagement />
    </div>
  );
}