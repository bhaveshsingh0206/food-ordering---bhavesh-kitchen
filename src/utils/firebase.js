import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDdXQKy2ENiBPSaDUXGlt4cGRuDgLbomPI",
    authDomain: "restaurant-404f7.firebaseapp.com",
    databaseURL: "https://restaurant-404f7-default-rtdb.firebaseio.com",
    projectId: "restaurant-404f7",
    storageBucket: "restaurant-404f7.appspot.com",
    messagingSenderId: "498109452541",
    appId: "1:498109452541:web:98e89da6aa17ea7f572e94",
    measurementId: "G-R8GV5VVTRJ"
};

firebase.initializeApp(firebaseConfig)

export default firebase;