 'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import SocialLinks from '../components/SocialLinks';
import type { Project } from '../types/project';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
// factura digital https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop

// Almacen https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=200&fit=crop

//https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop


//Pabellon criollo https://images.unsplash.com/photo-1563379091339-03246963d96f?w=400&h=200&fit=cro


// Mini MArket https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400&h=200&fit=crop








  // Datos de ejemplo (mientras configuras Firebase)
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
      // Conexión REAL con Firebase
      const querySnapshot = await getDocs(collection(db, 'projects'));
 const projectsData = querySnapshot.docs.map(doc => {
  const data = doc.data();
  
  // Conversión ROBUSTA para el caso de array con string
  let technologies: string[] = [];
  
  if (data.technologies) {
    if (Array.isArray(data.technologies)) {
      // Caso especial: array que contiene un string con formato de array
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
        // Array normal de strings
        technologies = data.technologies.filter(tech => 
          tech && typeof tech === 'string'
        );
      }
    } else if (typeof data.technologies === 'string') {
      // Es un string simple
      technologies = data.technologies.split(',').map(t => t.trim());
    }
  }
  
  console.log('🔄 Technologies procesado:', technologies);
  
  return {
    id: doc.id,
    title: data.title || 'Sin título',
    description: data.description || 'Sin descripción',
    imageUrl: data.imageUrl || '/api/placeholder/400/200',
    technologies: technologies,
    demoUrl: data.demoUrl,
    githubUrl: data.githubUrl,
    featured: data.featured || false,
    createdAt: data.createdAt || new Date().toISOString()
  }
}) as Project[];
      
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // En caso de error, muestra un mensaje al usuario
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  fetchProjects();
}, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Julio Pérez</h1>
          <p className="text-xl md:text-2xl mb-8">Desarrollador Backend JavaScript, Python ApiRest, Rust</p>
          <SocialLinks />
        </div>
      </section>

      {/* Sobre Mí */}
      <section id="sobre-mi" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Quién soy</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-6">
              💻 Desarrollador web apasionado por la innovación, con sólida experiencia en la creación de soluciones digitales eficientes y escalables. 🚀 Especializado en tecnologías modernas como React, Next.js, Firebase, MySQL y PostgreSQL, combinando rendimiento con una excelente experiencia de usuario. 📚 Siempre en búsqueda de nuevos conocimientos, disfruto enfrentar desafíos técnicos que impulsen mi crecimiento y el de cada proyecto.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚛️</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Frontend</h3>
                <p className="text-gray-600">React, Next.js, Tailwind CSS</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Backend</h3>
                <p className="text-gray-600">Node.js, Python,PostgreSQL, MySQL. </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Desiños</h3>
                <p className="text-gray-600">Figma, UI/UX</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Mis Proyectos</h2>
          
          {loading ? (
            <div className="text-center">
              <p className="text-gray-600">Cargando proyectos...</p>
            </div>
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
      <section id="estudios" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Estudios & Certificaciones</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
               
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-bold">Certificación Udetin Academy</h3>
                <p className="text-gray-600">Administración en Bases de Datos en MySql</p>
                <p className="text-gray-500 mt-1">Desarrollador de Aplicaciones Web con Python y Django</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-bold">Curso en Udemy</h3>
                <p className="text-gray-600">React TypeScript</p>
                <p className="text-gray-500 mt-1">Django Rest Framework</p>
                <p className="text-gray-500 mt-1">Programación en Python</p>
                <p className="text-gray-500 mt-1">PostgresSQL Avanzado</p>
                <p className="text-gray-500 mt-1">JavaScript Moderno</p>
                <p className="text-gray-500 mt-1">Visual Studio Code</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-bold">LinkedIn Learning</h3>
                <p className="text-gray-600">Word 2016</p>
                <p className="text-gray-500 mt-1">Excel 2016: Análisis y gestión de datos</p>
                 <p className="text-gray-600">Excel 2016: Fórmulas y funciones</p> 
                 <p className="text-gray-600">Excel 2016: Tablas dinámicas</p> 
                 <p className="text-gray-600">Word 2016 avanzado: Formularios</p>               
              </div>
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-bold">Edx</h3>
                <p className="text-gray-600">Análisis Estadístico con Excel</p>
                <p className="text-gray-500 mt-1">Gestión de Operaciones</p>                 
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">¿Tienes un proyecto en mente?</h2>
          <p className="text-xl mb-8">¡Hablemos y hagámoslo realidad!</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="mailto:julioz1126@gmail.com" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Contáctame
            </a>
            <a 
              href="/cv.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Descargar CV
            </a>
          </div>
          <div className="mt-8">
            <SocialLinks />
          </div>
        </div>
      </section>
    </Layout>
  );
}