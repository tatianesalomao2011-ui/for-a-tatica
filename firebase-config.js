// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKVqQ8yNMFrpMD_i93gSGvDuxP1SHQmXs",
  authDomain: "forca-tatica-b83f9.firebaseapp.com",
  projectId: "forca-tatica-b83f9",
  storageBucket: "forca-tatica-b83f9.firebasestorage.app",
  messagingSenderId: "862679194356",
  appId: "1:862679194356:web:288f3c70696ab80d349ca1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get database reference
const db = firebase.database();
