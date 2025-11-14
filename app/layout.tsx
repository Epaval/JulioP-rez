 import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Julio Perez',
  description: 'Portafolio personal desarrollado con Next.js y TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-white text-gray-900">{children}</body>
    </html>
  );
}