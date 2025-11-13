// scripts/debug-firebase.js
require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const debugProjects = async () => {
  try {
    console.log('🔍 Debug: Examinando proyectos en Firebase...\n');
    const querySnapshot = await getDocs(collection(db, 'projects'));
    
    querySnapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`📄 Proyecto ${index + 1}: ${data.title || 'Sin título'}`);
      console.log(`   ID: ${doc.id}`);
      console.log(`   technologies:`, data.technologies);
      console.log(`   Tipo de technologies:`, typeof data.technologies);
      console.log(`   ¿Es array?:`, Array.isArray(data.technologies));
      console.log(`   Valor crudo:`, JSON.stringify(data.technologies));
      console.log('---');
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

debugProjects();