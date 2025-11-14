'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-gray-800 tracking-tight">
              Julio Pérez
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-10">
              {[
                { href: '#proyectos', label: 'Proyectos' },
                { href: '#sobre-mi', label: 'Quién soy' },
                { href: '#estudios', label: 'Estudios' },
                { href: '#contacto', label: 'Contacto' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 p-5 bg-gray-50 rounded-xl shadow-lg animate-fadeIn">
              <ul className="space-y-4">
                {[
                  { href: '#proyectos', label: 'Proyectos' },
                  { href: '#sobre-mi', label: 'Quién soy' },
                  { href: '#estudios', label: 'Estudios' },
                  { href: '#contacto', label: 'Contacto' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block text-lg text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Julio Pérez. Todos los derechos reservados.
          </p>
          <div className="mt-3">
            <p className="text-xs opacity-80">
              Desarrollador Backend | Especialista en JavaScript, Python, Rust y Bases de Datos
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}