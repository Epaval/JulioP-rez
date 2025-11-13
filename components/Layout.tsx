'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Julio Pérez
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link href="#proyectos" className="hover:text-blue-600 transition">Proyectos</Link>
              <Link href="#sobre-mi" className="hover:text-blue-600 transition">Sobre Mí</Link>
              <Link href="#estudios" className="hover:text-blue-600 transition">Estudios</Link>
              <Link href="#contacto" className="hover:text-blue-600 transition">Contacto</Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4 bg-white p-4 rounded-lg shadow-lg">
              <Link href="#proyectos" className="block hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Proyectos</Link>
              <Link href="#sobre-mi" className="block hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Sobre Mí</Link>
              <Link href="#estudios" className="block hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Estudios</Link>
              <Link href="#contacto" className="block hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
            </div>
          )}
        </nav>
      </header>

      {children}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Julio Pérez. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}