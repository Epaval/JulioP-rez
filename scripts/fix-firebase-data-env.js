// scripts/fix-firebase-data-env.js
require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

console.log('🔧 Configuración Firebase:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain
});

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const fixTechnologies = async () => {
  try {
    console.log('🔄 Conectando a Firebase...');
    const querySnapshot = await getDocs(collection(db, 'projects'));
    console.log(`📊 Encontrados ${querySnapshot.docs.length} proyectos`);
    
    let fixedCount = 0;
    
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();
      
      if (typeof data.technologies === 'string') {
        let fixedTechnologies;
        
        if (data.technologies.startsWith('[') && data.technologies.endsWith(']')) {
          fixedTechnologies = JSON.parse(data.technologies);
        } else {
          fixedTechnologies = data.technologies.split(',').map(tech => tech.trim());
        }
        
        await updateDoc(doc(db, 'projects', docSnapshot.id), {
          technologies: fixedTechnologies
        });
        
        console.log(`✅ Fixed ${docSnapshot.id}:`, fixedTechnologies);
        fixedCount++;
      }
    }
    
    console.log(`\n🎉 ¡Completado! ${fixedCount} proyectos corregidos`);
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

fixTechnologies();