import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from 'firebase';


@Injectable()
export class UserProvider {

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, public googlePlus: GooglePlus) {
    console.log('Hello UserProvider Provider');
  }
  //Getting timestamp with current time zone

  getUserTimestamp() {
    const currentDate = new Date();
    const currentTimeStamp = currentDate.getTime();
    return currentTimeStamp;
  }

  signUpUser(user) {
    console.log('information of user', user);
    var promise = new Promise((resolve, reject) => {
      //Create a user in firebase with Email Authentication
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(() => {
        //Store the user Inside firestore Database
        this.afs.collection('user').doc(this.afAuth.auth.currentUser.uid).set({
          userName: user.parentName,
          email: user.email,
          userTimeStamp: user.timestamp
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          console.log('errors', err);
          reject(err);
        });
      }).catch((err) => {
        console.log('errors', err);
        reject(err);
      });
    });
    return promise;
  }
  //Sign In with Google

  googleSignIn(userTimestamp) {
    console.log('timestamp', userTimestamp);
    const promise = new Promise((resolve, reject) => {
      this.googlePlus.login({
        'webClientId': '155233054235-likk4sqfgglcqr08ulnj0b9cfqlfi95l.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
        console.log('google Apiss response', res);
        const credentials = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        firebase.auth().signInWithCredential(credentials).then(user => {
          this.afs.collection('user').doc(this.afAuth.auth.currentUser.uid).set({
            userName: res.displayName,
            email: res.email,
            userTimeStamp: userTimestamp
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            console.log('errors', err);
            reject(err);
          });
        }).catch(error => {
          console.log('errors', error);
        });
      }).catch(error => {
        console.log('errors', error);
      });
    });
    return promise;
  }
  logOut() {
    return this.afAuth.auth.signOut();
  }
}
