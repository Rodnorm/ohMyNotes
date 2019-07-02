import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCIVhfUaVA5YEK9EbrpaMevkIThVIHGa2k",
    authDomain: "ohmanotes.firebaseapp.com",
    databaseURL: "https://ohmanotes.firebaseio.com",
    projectId: "ohmanotes",
    storageBucket: "",
    messagingSenderId: "92214363528",
    appId: "1:92214363528:web:68ab93fa33d24559"
}

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth()
    }

    doCreateUserWithEmailAndPassword = (email, password) => {
        this.auth.createUserWithEmailAndPassword(email, password);
    }

    doSignInWithEmailAndPassword = (email, password) => {
        this.auth.signInWithEmailAndPassword(email, password);
    }

    doSignOut = () => this.auth.signOut();

    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);
}

export default Firebase