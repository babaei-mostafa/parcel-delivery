import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyASGf3xaQKOEsMZaYET96y4yh0GI9oI4pk',
  authDomain: 'uber4things.firebaseapp.com',
  databaseURL: 'https://uber4things.firebaseio.com',
  projectId: 'uber4things',
  storageBucket: 'uber4things.appspot.com',
  messagingSenderId: '269078947820',
  appId: '1:269078947820:web:e78318cd4e8fb44354c2c9',
  measurementId: 'G-LW7HN2YY44',
}

// Initialize Firebase with your configuration object
const app = initializeApp(firebaseConfig)

// Get a Firestore instance
const db = getFirestore(app)

// Define a reference to the "parcelTypes" collection
const parcelTypesRef = collection(db, 'bearerParcels')

// Export a function that fetches the "parcelTypes" collection
export const getParcelTypes = () => {
  return getDocs(parcelTypesRef).then((querySnapshot) => {
    return querySnapshot.docs.map((doc) => doc.data())
  })
}
