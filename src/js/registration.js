import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
    } 
    from "firebase/auth";  
import Notiflix from 'notiflix';



// // - ----------------- Ініціалізація firedase-----------

const firebaseConfig = {
  apiKey: "AIzaSyBWrFAqAFntJ4flrBPGSJfTbwL-MdVWPSE",
  authDomain: "news-js-team-project.firebaseapp.com",
  projectId: "news-js-team-project",
  storageBucket: "news-js-team-project.appspot.com",
  messagingSenderId: "933844839005",
  appId: "1:933844839005:web:f1a1bd4caa61a577ac3bb4",
  measurementId: "G-W0FCRYRSGW"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// //-----------------Робота над самою авторизацією-----------

const elLogin = document.querySelector('#userEmail');
const elPasword = document.querySelector('#userPassword');
const btnSubmit = document.querySelector('.login-btn-sign');


// ------------------- Вхід----------------
const loginEmailPassword = async (e) => {
    e.preventDefault();

     const email = elLogin.value;
     const password = elPasword.value;


   try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    document.querySelector('[login-data-modal]').classList.add('is-hidden');
    
}
catch (error){
    // if(err.code === 'auth/email-already-in-use');
    // alert('Oops. ' + err.code)
};
};


btnSubmit.addEventListener('click', loginEmailPassword);

// ----------------Створення акунта ----------------

const creatAccount = async (e) => {
    e.preventDefault();
     const email = elLogin.value;
     const password = elPasword.value;


    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        document.querySelector('[login-data-modal]').classList.add('is-hidden');
        // document.querySelector('header__login-btn').value = 'LogOut';
    }
    catch (err){
        // if(err.code === 'auth/email-already-in-use');
        // alert('Oops. ' + err.code)
    }
    };


btnSubmit.addEventListener('click', creatAccount)

// ------------ Перевірка стану входу----------

const monitorAuthState = async () => {
   onAuthStateChanged (auth, user => {
    if (user) {
        Notiflix.Notify.success(
            `Рады привествовать вас ${elLogin.value}`,
            {
              opacity: 1,
              position: 'center-top',
              timeout: 450,
              cssAnimationDuration: 3000,
              cssAnimationStyle: 'from-top',
            }
          )
       elLogin.value = '';
       elPasword.value = '';
       document.querySelector('.header__login-btn').textContent = 'LogOut';
    } else {
        // Notiflix.Notify.failure(
        //     'Sorry, the password or email you entered is incorrect, please try again!',
        //     {
        //       opacity: 1,
        //       position: 'center-top',
        //       timeout: 450,
        //       cssAnimationDuration: 3000,
        //       cssAnimationStyle: 'from-top',
        //     }
        //   )

    };
   })
};

monitorAuthState();

// --------------------Вихід з вашого акаунта----------

const logOut = async () => {
    if (document.querySelector('.header__login-btn').textContent = 'LogOut'){
        await signOut(auth);
        document.querySelector('.header__login-btn').textContent = 'login';
    }
}

document.querySelector('.header__login-btn').addEventListener('click', logOut)