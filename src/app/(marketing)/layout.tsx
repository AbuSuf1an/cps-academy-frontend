import { Header } from '@/components/marketing/Header';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main className='flex-1'>{children}</main>
    </div>
  );
}