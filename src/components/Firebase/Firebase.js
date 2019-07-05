import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCIVhfUaVA5YEK9EbrpaMevkIThVIHGa2k",
    authDomain: "ohmanotes.firebaseapp.com",
    databaseURL: "https://ohmanotes.firebaseio.com",
    projectId: "ohmanotes",
    storageBucket: "ohmanotes.appspot.com",
    messagingSenderId: "92214363528",
    appId: "1:92214363528:web:68ab93fa33d24559"
}

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }

    // User Handling

    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);

    // Database API
    user = uid => this.db.ref(`users/${uid}`);
    notes = uid => this.db.ref(`notes/${uid}`);
}

export default Firebase