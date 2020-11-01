import firebase from 'firebase'
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCQraemCwJbUtcnWBSzs5gmXmTOuhZ1oRQ",
    authDomain: "todo-a23b6.firebaseapp.com",
    databaseURL: "https://todo-a23b6.firebaseio.com",
    projectId: "todo-a23b6",
    storageBucket: "todo-a23b6.appspot.com",
    messagingSenderId: "1059840627843",
    appId: "1:1059840627843:web:e0098b3cf3b9d2de0c77b6"
}

class FireBase {
    constructor(callback) {
        this.init(callback)
    }
    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user)
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error)
                    });
            }
        });
    }

    getLists(callback) {
        let ref = firebase
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("lists");


            this.unsubscribe = ref.onSnapshot(snapshot => {
                lists = []

                snapshot.forEach(doc => {
                    lists.push({ id: doc.id, ...doc.data() })
                });
                callback(lists)
            });
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    detach() {
        this.unsubscribe();
    }
}

export default FireBase;