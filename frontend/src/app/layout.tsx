import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Use swap to avoid render-blocking
  variable: '--font-inter' // Define as CSS variable
});

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A beautiful todo application with authentication',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <div id="modal-root" />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}