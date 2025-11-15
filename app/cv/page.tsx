 'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaDownload, FaArrowLeft, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaPhone, FaCalendar } from 'react-icons/fa';

export default function CVPage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      window.print();
      setIsDownloading(false);
    }, 600);
  };

  return (
    <>
      {/* Estilos avanzados para impresión A4 */}
      <style jsx>{`
        @media print {
          @page {
            margin: 0;
            size: A4 portrait;
          }
          
          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            background: white !important;
            color: #000 !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          .page-container {
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            padding: 15mm !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
          }
          
          .print-section {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          .print-margin-bottom,
          .space-y-6 > :not(:last-child) {
            margin-bottom: 8mm !important;
          }
          
          .print-padding {
            padding: 5mm !important;
          }
          
          .print-text-sm {
            font-size: 9pt !important;
          }
          
          .print-text-base {
            font-size: 10.5pt !important;
          }
          
          .print-text-lg {
            font-size: 12pt !important;
          }
          
          .print-text-xl {
            font-size: 14pt !important;
          }
          
          .print-text-2xl {
            font-size: 18pt !important;
          }
          
          .bg-white {
            background: white !important;
          }
          
          .shadow-lg {
            box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
          }
          
          .border {
            border: 0.5pt solid #e5e5e5 !important;
          }
          
          * {
            -webkit-transition: none !important;
            transition: none !important;
            -webkit-transform: none !important;
            transform: none !important;
            filter: none !important;
          }
        }

        /* Diseño A4 en pantalla */
        .page-container {
          width: 210mm;
          min-height: 297mm;
          margin: 2rem auto;
          background: white;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
          border: 1px solid #ddd;
        }

        @media (max-width: 768px) {
          .page-container {
            width: 100%;
            min-height: auto;
            margin: 0;
            border: none;
            box-shadow: none;
          }
          .flex-col-mobile {
            flex-direction: column !important;
          }
        }
      `}</style>

      {/* Header solo visible en pantalla */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-50 no-print">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium group"
          >
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          >
            <FaDownload className={`mr-2 ${isDownloading ? 'animate-pulse' : ''}`} />
            {isDownloading ? 'Generando...' : 'Guardar como PDF'}
          </button>
        </div>
      </header>

      {/* Contenido principal - CV en formato A4 */}
      <main className="page-container">
        <div className="h-full flex flex-col p-6">
          {/* Encabezado */}
          <section className="print-section print-margin-bottom border-b border-gray-200 pb-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Foto */}
              <div className="flex-shrink-0">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="/foto-perfil.jpeg"
                    alt="Julio Pérez - Desarrollador Backend"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Información personal */}
              <div className="text-center md:text-left flex-1">
                <h1 className="print-text-2xl font-bold text-gray-800">Julio Pérez</h1>
                <p className="print-text-xl text-blue-600 font-semibold mb-4">Desarrollador Backend</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 print-text-base text-gray-600">
                  <div className="flex items-center justify-center sm:justify-start">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    <span>Venezuela</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <FaCalendar className="mr-2 text-purple-500" />
                    <span>28 de Diciembre, 1970</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <FaEnvelope className="mr-2 text-blue-500" />
                    <span>julioz1126@gmail.com</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <FaPhone className="mr-2 text-green-500" />
                    <span>(+58) 424-4388859</span>
                  </div>
                </div>

                {/* Redes Sociales */}
                <div className="flex justify-center sm:justify-start space-x-6 mt-4">
                  <a
                    href="https://github.com/Epaval"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                  >
                    <FaGithub size={20} />
                  </a>
                  <a
                    href="https://linkedin.com/in/julio-perez-2058b2b1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                  >
                    <FaLinkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Contenido en dos columnas */}
          <div className="flex-1 grid md:grid-cols-3 gap-8">
            {/* Columna principal (2/3) */}
            <div className="md:col-span-2 space-y-8">
              {/* Resumen Profesional */}
              <section className="print-section bg-white p-6 rounded-xl shadow-lg border print-padding">
                <h2 className="print-text-xl font-bold text-gray-800 border-l-4 border-blue-500 pl-3 mb-4">
                  Resumen Profesional
                </h2>
                <p className="print-text-base text-gray-700 leading-relaxed text-justify">
                  Desarrollador backend apasionado por construir APIs robustas y sistemas escalables. 
                  Experiencia sólida en tecnologías como JavaScript, Python, Rust, Node.js, Django, 
                  PostgreSQL, MySQL y Firebase. Especializado en arquitecturas limpias, bases de datos 
                  y optimización de rendimiento. Comprometido con buenas prácticas, código mantenible 
                  y soluciones eficientes.
                </p>
              </section>

              {/* Experiencia Profesional */}
              <section className="print-section bg-white p-6 rounded-xl shadow-lg border print-padding">
                <h2 className="print-text-xl font-bold text-gray-800 border-l-4 border-green-500 pl-3 mb-4">
                  Experiencia Profesional
                </h2>
                <div className="space-y-5">
                  <div>
                    <h3 className="print-text-lg font-semibold text-gray-800">Desarrollador Backend</h3>
                    <p className="print-text-sm text-gray-600 mb-3">Freelance / Proyectos Personales | 2022 – Presente</p>
                    <ul className="print-text-base text-gray-700 space-y-2 ml-5 list-disc">
                      <li>Diseño e implementación de APIs REST con Node.js, Python y Rust.</li>
                      <li>Integración con bases de datos relacionales y Firestore.</li>
                      <li>Desarrollo de aplicaciones full-stack con Next.js y Firebase.</li>
                      <li>Optimización de consultas y creación de índices para mejorar rendimiento.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Proyectos Destacados */}
              <section className="print-section bg-white p-6 rounded-xl shadow-lg border print-padding">
                <h2 className="print-text-xl font-bold text-gray-800 border-l-4 border-purple-500 pl-3 mb-4">
                  Proyectos Destacados
                </h2>
                <div className="space-y-5">
                  <div>
                    <h3 className="print-text-lg font-semibold text-gray-800">API REST en Rust con Axum</h3>
                    <p className="print-text-base text-gray-700">Sistema backend de alta concurrencia con manejo de autenticación y bases de datos MySQL.</p>
                  </div>
                  <div>
                    <h3 className="print-text-lg font-semibold text-gray-800">App Full-Stack con Next.js + Firebase</h3>
                    <p className="print-text-base text-gray-700">Aplicación de tareas en tiempo real con autenticación, CRUD y despliegue en Vercel.</p>
                  </div>
                  <div>
                    <h3 className="print-text-lg font-semibold text-gray-800">E-commerce con Node.js y Stripe</h3>
                    <p className="print-text-base text-gray-700">Plataforma completa con carrito, pasarela de pagos y panel administrativo.</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Columna lateral (1/3) */}
            <div className="space-y-8">
              {/* Habilidades Técnicas */}
              <section className="print-section bg-white p-6 rounded-xl shadow-lg border print-padding">
                <h2 className="print-text-xl font-bold text-gray-800 border-l-4 border-orange-500 pl-3 mb-4">
                  Habilidades Técnicas
                </h2>
                <div className="space-y-5">
                  <div>
                    <h3 className="print-text-lg font-semibold text-gray-800 mb-3">Lenguajes & Frameworks</h3>
                    <div className="flex flex-wrap gap-2">
                      {['JavaScript/TypeScript', 'Python', 'Rust', 'Node.js', 'Django', 'Next.js'].map((skill) => (
                        <span
                          key={skill}
                          className="print-text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="print-text-lg font-semibold text-gray-800 mb-3">Bases de Datos & Herramientas</h3>
                    <div className="flex flex-wrap gap-2">
                      {['PostgreSQL', 'MySQL', 'Firebase', 'Git/GitHub', 'Docker', 'Vercel'].map((skill) => (
                        <span
                          key={skill}
                          className="print-text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Educación y Certificaciones */}
              <section className="print-section bg-white p-6 rounded-xl shadow-lg border print-padding">
                <h2 className="print-text-xl font-bold text-gray-800 border-l-4 border-red-500 pl-3 mb-4">
                  Educación & Certificaciones
                </h2>
                <div className="space-y-4 print-text-sm text-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-800">Udetin Academy</h3>
                    <p>Administración en Bases de Datos con MySQL</p>
                    <p>Desarrollador Web con Python y Django</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Cursos Especializados</h3>
                    <p>React + TypeScript, Django REST Framework</p>
                    <p>JavaScript Moderno, PostgreSQL Avanzado</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">LinkedIn Learning</h3>
                    <p>Excel Avanzado, Análisis de Datos</p>
                  </div>
                </div>
              </section>

              {/* Información Adicional */}
              <section className="print-section bg-white p-6 rounded-xl shadow-lg border print-padding">
                <h2 className="print-text-xl font-bold text-gray-800 border-l-4 border-indigo-500 pl-3 mb-4">
                  Información Adicional
                </h2>
                <div className="print-text-sm text-gray-700 space-y-2">
                  <p><strong>Disponibilidad:</strong> Inmediata</p>
                  <p><strong>Idiomas:</strong> Español (Nativo)</p>
                  <p><strong>Intereses:</strong> Open Source, Arquitectura de Software</p>
                </div>
              </section>
            </div>
          </div>

          {/* Footer interno del CV */}
          <footer className="mt-10 pt-4 border-t border-gray-200 print-text-sm text-gray-500 text-center">
            <p>Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </footer>
        </div>
      </main>

      {/* Footer global (solo en navegador) */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 py-8 mt-8 no-print">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Julio Pérez. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            CV profesional optimizado para impresión - Desarrollado con Next.js y Tailwind CSS
          </p>
        </div>
      </footer>
    </>
  );
}