import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// export const helloWorld2 = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");

admin.initializeApp(functions.config().firebase);
export const addUserMessages = functions.database
 .ref(`/messages/{messageId}`)
 .onWrite( async event => {
 const messageKey = event.data.key;
 const messageValue = event.data.val();
 await admin.database().ref(`/user-messages/${messageValue.userFromId}/${messageValue.userToId}`).child(messageKey).set(1).then();
 await admin.database().ref(`/user-messages/${messageValue.userToId}/${messageValue.userFromId}`).child(messageKey).set(1).then();
 });
