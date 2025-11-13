// scripts/fix-image-urls.js
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

const fixImageUrls = async () => {
  try {
    console.log('🔄 Conectando a Firebase...');
    const querySnapshot = await getDocs(collection(db, 'projects'));
    console.log(`📊 Encontrados ${querySnapshot.docs.length} proyectos\n`);
    
    let fixedCount = 0;
    
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();
      console.log(`🔍 Proyecto: ${data.title}`);
      console.log(`   imageUrl actual:`, data.imageUrl);
      
      if (data.imageUrl && typeof data.imageUrl === 'string') {
        let cleanedUrl = data.imageUrl.trim();
        
        // Remover comillas dobles extras
        if (cleanedUrl.startsWith('"') && cleanedUrl.endsWith('"')) {
          cleanedUrl = cleanedUrl.slice(1, -1);
        }
        cleanedUrl = cleanedUrl.replace(/"/g, '');
        
        // Verificar si cambió
        if (cleanedUrl !== data.imageUrl) {
          await updateDoc(doc(db, 'projects', docSnapshot.id), {
            imageUrl: cleanedUrl
          });
          console.log(`   ✅ Corregido: ${cleanedUrl}`);
          fixedCount++;
        } else {
          console.log(`   ✅ Ya está correcto`);
        }
      }
      console.log('---');
    }
    
    console.log(`\n🎉 ¡Completado! ${fixedCount} URLs de imagen corregidas`);
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

fixImageUrls();