import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCF5QtGXowzKdVZCXitBuG-TaxfIGcRH7g',
  authDomain: 'sud-mun-pwa-2017.firebaseapp.com',
  databaseURL: 'https://sud-mun-pwa-2017.firebaseio.com',
  projectId: 'sud-mun-pwa-2017',
  storageBucket: 'sud-mun-pwa-2017.appspot.com',
  messagingSenderId: '701725827130'
}

firebase.initializeApp(config)

export const db = firebase.database()
export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
