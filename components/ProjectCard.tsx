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

  // Aseguramos que technologies sea un array válido
  const technologies = Array.isArray(project.technologies)
    ? project.technologies.filter((tech): tech is string => typeof tech === 'string' && Boolean(tech.trim()))
    : [];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg hover:shadow-gray-300/40 transition-all duration-300 transform hover:-translate-y-1">
      {/* Imagen del proyecto */}
      <div className="relative h-48 bg-gray-100">
        {!imageError && project.imageUrl ? (
          <>
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className={`object-cover transition-opacity duration-500 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onError={() => setImageError(true)}
              onLoad={() => setImageLoading(false)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-400"></div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <span className="text-gray-400 text-sm font-medium">Sin imagen</span>
          </div>
        )}

        {/* Overlay sutil al hacer hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2 mb-5">
          {technologies.length > 0 ? (
            technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors duration-200"
              >
                {tech}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-xs italic">Sin tecnologías</span>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex space-x-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-900 hover:bg-black text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-sm text-center shadow-sm hover:shadow-md"
            >
              Ver Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 border border-gray-400 text-gray-700 hover:border-gray-600 hover:text-gray-900 font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm text-center ${
                !project.demoUrl ? 'flex-auto' : ''
              }`}
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}