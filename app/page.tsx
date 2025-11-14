 'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import type { Project } from '../types/project';

// Importamos iconos reales
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo (puedes mantenerlos temporalmente)
  const sampleProjects: Project[] = [
    {
      id: '1',
      title: 'E-commerce React',
      description: 'Tienda online completa con carrito de compras, pasarela de pago y panel administrativo.',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      demoUrl: 'https://demo-ecommerce.com',
      githubUrl: 'https://github.com/tuusuario/ecommerce',
      featured: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'App de Tareas',
      description: 'Aplicación de gestión de tareas con drag & drop, notificaciones y sincronización en tiempo real.',
      imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop',
      technologies: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind'],
      demoUrl: 'https://tareas-app.vercel.app',
      githubUrl: 'https://github.com/tuusuario/task-app',
      featured: true,
      createdAt: '2024-02-20'
    },
    {
      id: '3',
      title: 'Dashboard Analytics',
      description: 'Panel de control con gráficos interactivos, métricas en tiempo real y exportación de reportes.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
      technologies: ['Vue.js', 'D3.js', 'Express', 'PostgreSQL'],
      demoUrl: 'https://dashboard-example.com',
      githubUrl: 'https://github.com/tuusuario/dashboard',
      featured: false,
      createdAt: '2024-03-10'
    },
    {
      id: '4',
      title: 'Blog Personal',
      description: 'Blog moderno con sistema de comentarios, búsqueda y categorías. Optimizado para SEO.',
      imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop',
      technologies: ['Next.js', 'MDX', 'Vercel', 'CSS Modules'],
      demoUrl: 'https://mi-blog.vercel.app',
      githubUrl: 'https://github.com/Epaval/blog',
      featured: true,
      createdAt: '2024-04-05'
    },
    {
      id: '5',
      title: 'App del Clima',
      description: 'Aplicación meteorológica con pronósticos en tiempo real y geolocalización.',
      imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=200&fit=crop',
      technologies: ['React Native', 'OpenWeather API', 'Expo'],
      demoUrl: 'https://expo.io/@tuusuario/weather-app',
      githubUrl: 'https://github.com/tuusuario/weather-app',
      featured: false,
      createdAt: '2024-05-12'
    },
    {
      id: '6',
      title: 'Sistema de Reservas',
      description: 'Plataforma de reservas online con calendario integrado y notificaciones por email.',
      imageUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&h=200&fit=crop',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'SendGrid'],
      demoUrl: 'https://reservas-app.com',
      githubUrl: 'https://github.com/tuusuario/booking-system',
      featured: true,
      createdAt: '2024-06-18'
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          
          let technologies: string[] = [];
          if (data.technologies) {
            if (Array.isArray(data.technologies)) {
              if (data.technologies.length === 1 && typeof data.technologies[0] === 'string') {
                const techString = data.technologies[0].trim();
                if (techString.startsWith('[') && techString.endsWith(']')) {
                  try {
                    technologies = JSON.parse(techString);
                  } catch (error) {
                    technologies = techString.replace(/[\[\]"]/g, '').split(',').map(t => t.trim());
                  }
                } else {
                  technologies = techString.split(',').map(t => t.trim());
                }
              } else {
                technologies = data.technologies.filter((tech: any) => typeof tech === 'string');
              }
            } else if (typeof data.technologies === 'string') {
              technologies = data.technologies.split(',').map((t: string) => t.trim());
            }
          }

          return {
            id: doc.id,
            title: data.title || 'Sin título',
            description: data.description || 'Sin descripción',
            imageUrl: data.imageUrl || '/api/placeholder/400/200',
            technologies,
            demoUrl: data.demoUrl,
            githubUrl: data.githubUrl,
            featured: data.featured || false,
            createdAt: data.createdAt || new Date().toISOString()
          };
        }) as Project[];

        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(sampleProjects); // fallback opcional
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Componente SocialLinks inline
  const SocialLinks = () => (
    <div className="flex justify-center space-x-6 mt-6">
      <a
        href="https://linkedin.com/in/julioperez"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
        aria-label="LinkedIn"
      >
        <FaLinkedin size={28} />
      </a>
      <a
        href="https://github.com/tuusuario"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-black transition-colors duration-300"
        aria-label="GitHub"
      >
        <FaGithub size={28} />
      </a>
      <a
        href="mailto:julioz1126@gmail.com"
        className="text-gray-700 hover:text-red-600 transition-colors duration-300"
        aria-label="Email"
      >
        <SiGmail size={28} />
      </a>
    </div>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-black text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">Julio Pérez</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Desarrollador Backend | JavaScript, Python, Rust | APIs REST
          </p>
          <SocialLinks />
        </div>
      </section>

      {/* Sobre Mí */}
      <section id="sobre-mi" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Quién soy</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed mb-12">
              Desarrollador web apasionado por la creación de soluciones digitales eficientes y escalables.
              Especializado en tecnologías modernas como Node.js, Python, Rust, PostgreSQL, MySQL y Firebase,
              combinando rendimiento backend con arquitecturas limpias y mantenibles.
            </p>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                  <span className="text-2xl text-gray-700">⚛️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Frontend</h3>
                <p className="text-gray-600">React, Next.js, Tailwind CSS</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                  <span className="text-2xl text-gray-700">🔧</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Backend</h3>
                <p className="text-gray-600">Python, Node.js, Rust, PostgreSQL, MySQL</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                  <span className="text-2xl text-gray-700">🎨</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Diseño UI/UX</h3>
                <p className="text-gray-600">Figma, Prototipado, Experiencia de Usuario</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Proyectos Destacados</h2>
          {loading ? (
            <p className="text-center text-gray-500 text-lg">Cargando proyectos...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Estudios */}
      <section id="estudios" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Estudios & Certificaciones</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="border-l-4 border-gray-800 pl-6">
                <h3 className="text-xl font-bold text-gray-800">Certificación Udetin Academy</h3>
                <p className="text-gray-700">Administración en Bases de Datos con MySQL</p>
                <p className="text-gray-600 mt-1">Desarrollador Web con Python y Django</p>
              </div>
              <div className="border-l-4 border-gray-800 pl-6">
                <h3 className="text-xl font-bold text-gray-800">Curso en Udemy</h3>
                <p className="text-gray-700">React + TypeScript, Django REST Framework, Python, PostgreSQL Avanzado</p>
              </div>
              <div className="border-l-4 border-gray-800 pl-6">
                <h3 className="text-xl font-bold text-gray-800">LinkedIn Learning</h3>
                <p className="text-gray-700">Word, Excel (Fórmulas, Tablas Dinámicas, Análisis de Datos)</p>
              </div>
              <div className="border-l-4 border-gray-800 pl-6">
                <h3 className="text-xl font-bold text-gray-800">edX</h3>
                <p className="text-gray-700">Análisis Estadístico con Excel, Gestión de Operaciones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Tienes un proyecto?</h2>
          <p className="text-xl text-gray-300 mb-10">Hablemos y hagámoslo realidad.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:julioz1126@gmail.com"
              className="bg-white text-gray-900 hover:bg-gray-200 font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-md"
            >
              Enviar Correo
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Descargar CV
            </a>
          </div>
          <div className="mt-12">
            <SocialLinks />
          </div>
        </div>
      </section>
    </Layout>
  );
}