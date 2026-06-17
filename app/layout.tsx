import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Import your new components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Phasor.io | AC Circuit Engine',
  description: 'Interactive engineering workspace for calculating and visualizing AC circuit parameters.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 flex flex-col min-h-screen`}>
        <Navbar />
        
        {/* The <main> tag holds whatever page the user is currently visiting */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}