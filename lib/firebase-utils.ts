import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import type { Project } from '../types/project';

// Agregar nuevo proyecto
export const addProject = async (project: Omit<Project, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...project,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

// Actualizar proyecto existente
export const updateProject = async (id: string, project: Partial<Project>) => {
  try {
    await updateDoc(doc(db, 'projects', id), project);
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Eliminar proyecto
export const deleteProject = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'projects', id));
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};