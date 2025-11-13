 'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Asegurarnos de que technologies siempre sea un array
  const technologies = project.technologies || [];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 border border-gray-200">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {!imageError ? (
          <>
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className={`object-cover transition duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onError={() => setImageError(true)}
              onLoad={() => setImageLoading(false)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <span className="text-4xl mb-2 block">📷</span>
              <span className="text-sm">Imagen no disponible</span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
        
        {/* Sección corregida de tecnologías */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
          {technologies.length === 0 && (
            <span className="text-gray-400 text-sm">Sin tecnologías especificadas</span>
          )}
        </div>
        
        <div className="flex space-x-3">
          {project.demoUrl && (
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-sm"
            >
              Ver Demo
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg transition duration-300 text-sm"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}