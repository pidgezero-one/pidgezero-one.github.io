import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyCLVRiWXF-bre4eGnGOszx36qdpimJOO3Q",
	authDomain: "schustats.firebaseapp.com",
	databaseURL: "https://schustats-default-rtdb.firebaseio.com",
	projectId: "schustats",
	storageBucket: "schustats.appspot.com",
	messagingSenderId: "108532153911",
	appId: "1:108532153911:web:6f49f409227d65e08ac9b2",
	measurementId: "G-VW61W9SV17"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
