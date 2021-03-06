import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from 'firebase';
import { Globalization } from '@ionic-native/globalization';


@Injectable()
export class UserProvider {

    currentUserEmail = "";
    timezone: any;
    utc_offset: any;

    constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, public googlePlus: GooglePlus,
        public globalization: Globalization) {
        console.log('Hello UserProvider Provider');
        this.getTimeZoneAndOffset().then(res => {
            this.timezone = res.timezone;
            this.utc_offset = res.utc_offset;
        }).catch(error => {
            console.warn('Could not get timezone and offset from Ionic Globalization. Running in browser? Setting timezone to defaults (mountain) for debug', error);
            this.timezone = "MDT";
            this.utc_offset = -6 * 60 * 60; //OFFSET is returned from globilzation in seconds! 
        });
    }
    //Getting timestamp with current time zone
    getUserTimestamp() {
        const currentDate = new Date();
        const currentTimeStamp = currentDate.getTime();
        return currentTimeStamp;
    }
    getTimeZoneAndOffset() {
        let options = {
            formatLength: 'short',
            selector: 'date and time'
        }
        return this.globalization.getDatePattern(options);
    }
    getCurrentUserEmail() {
        return this.currentUserEmail;
    }

    getUser(email) {
        return this.afs.collection('user', ref => ref.where('email', '==', email)).valueChanges();
    }
    
    loginUser(email, password) {
        var promise = new Promise((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
                if (res) {
                    console.log('Successfully Logged In', res);
                    this.currentUserEmail = email
                    resolve({ success: true });
                }
            }).catch(error => {
                reject(error);
            });
        });
        return promise;
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
                    userTimeStamp: user.timestamp,
                    timezone: this.timezone,
                    utc_offset: this.utc_offset
                }).then(() => {
                    this.currentUserEmail = user.email
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
                        this.currentUserEmail = res.email
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

    //Send Password Recovery Email to the user
    passwordReset(email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }

    changePassword(email, oldPassword, newPassword) {
        let a = firebase.auth.EmailAuthProvider.credential(email, oldPassword);
        let user = this.afAuth.auth.currentUser;

         const promise = new Promise((resolve, reject) => {

            user.reauthenticateWithCredential(a).then(res => {
                console.log('Re-Authentication');
                user.updatePassword(newPassword).then(resp => {
                    console.log('Password Updated Successfully');
                    return resolve(true);
                }).catch(error => {
                    reject(error);
                });
    
            }).catch(error => {
                console.log('Error while Re-Authenticating: ', error);
                reject(error);
            });

         });

         return promise;
    }

    logOut() {
        return this.afAuth.auth.signOut();
    }
}
