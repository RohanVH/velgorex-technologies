import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './errorHandlers';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Use initializeFirestore with experimentalForceLongPolling for better stability in proxy environments.
// This is often required in sandboxed or firewalled development containers.
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  ignoreUndefinedProperties: true,
}, firebaseConfig.firestoreDatabaseId);

export const googleProvider = new GoogleAuthProvider();

// Mandatory Connection Test with Improved Error Handling
async function testConnection(retries = 3) {
  const path = 'test/connection';
  try {
    // Attempt to fetch a non-existent document to check connectivity.
    await getDocFromServer(doc(db, 'system', 'connection_test'));
    console.log("Firebase Connection: Active");
  } catch (error: any) {
    if (error?.code === 'unavailable' && retries > 0) {
      console.warn(`Firebase Connection: Service unavailable. Retrying... (${retries} left)`);
      setTimeout(() => testConnection(retries - 1), 5000);
    } else if (error?.code === 'unavailable') {
      console.error("Firebase Connection Error: Firestore is unavailable after multiple attempts.");
    } else if (error?.message?.includes('the client is offline')) {
      console.error("Firebase Connection Error: The client is offline.");
    } else if (error?.code === 'permission-denied') {
      console.log("Firebase Connection: Handshake Successful (Access Restricted)");
    } else {
      try {
        handleFirestoreError(error, OperationType.GET, path, auth);
      } catch (err) {
        console.error("Firebase Critical Diagnostic:", error);
      }
    }
  }
}

// Run test connection with a slight delay
setTimeout(testConnection, 3000);
