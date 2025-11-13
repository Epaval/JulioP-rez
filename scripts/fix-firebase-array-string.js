// scripts/fix-firebase-array-string.js
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const fixArrayString = async () => {
  try {
    console.log('🔄 Conectando a Firebase...');
    const querySnapshot = await getDocs(collection(db, 'projects'));
    console.log(`📊 Encontrados ${querySnapshot.docs.length} proyectos\n`);
    
    let fixedCount = 0;
    
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();
      console.log(`🔍 Proyecto: ${data.title}`);
      console.log(`   technologies actual:`, data.technologies);
      
      if (Array.isArray(data.technologies) && data.technologies.length === 1 && typeof data.technologies[0] === 'string') {
        const techString = data.technologies[0].trim();
        console.log(`   ⚠️  Detectado array con string: "${techString}"`);
        
        let fixedTechnologies;
        
        if (techString.startsWith('[') && techString.endsWith(']')) {
          // Es un string que representa un array: "["React", "Next.js"]"
          try {
            fixedTechnologies = JSON.parse(techString);
            console.log(`   ✅ Parseado como JSON:`, fixedTechnologies);
          } catch (error) {
            console.log(`   ❌ Error parseando JSON, usando split`);
            fixedTechnologies = techString.replace(/[\[\]"]/g, '').split(',').map(t => t.trim());
          }
        } else {
          // Es un string simple
          fixedTechnologies = techString.split(',').map(t => t.trim());
        }
        
        await updateDoc(doc(db, 'projects', docSnapshot.id), {
          technologies: fixedTechnologies
        });
        
        console.log(`   ✅ Corregido a:`, fixedTechnologies);
        fixedCount++;
      } else if (Array.isArray(data.technologies)) {
        console.log(`   ✅ Ya es un array válido`);
      } else {
        console.log(`   ⚠️  Formato inesperado`);
      }
      console.log('---');
    }
    
    console.log(`\n🎉 ¡Completado! ${fixedCount} proyectos corregidos`);
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

fixArrayString();