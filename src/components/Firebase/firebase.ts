import "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
// import "components/Firebase/auth";
// import "components/Firebase/firestore";
let config;
const isDevelop = process.env.NODE_ENV === "development" ? true : false;
if (isDevelop) {
  config = {
    apiKey: "AIzaSyAKlm0mfA-9MXjO7mvl9w8_unTtNlsQWZA",
    authDomain: "streetfood-dev.firebaseapp.com",
    databaseURL: "https://streetfood-dev.firebaseio.com",
    projectId: "streetfood-dev",
    storageBucket: "streetfood-dev.appspot.com",
    messagingSenderId: "1029097500664",
    appId: "1:1029097500664:web:91584cd345b4584dcfb00d",
    measurementId: "G-FGVJYC9LLK"
  };
} else {
  config = {
    apiKey: "AIzaSyBM5T-wuLpxNUZPkv86-MLJjo4BZaK268g",
    authDomain: "streetfood-a95cc.firebaseapp.com",
    databaseURL: "https://streetfood-a95cc.firebaseio.com",
    projectId: "streetfood-a95cc",
    storageBucket: "streetfood-a95cc.appspot.com",
    messagingSenderId: "763952527520",
    appId: "1:763952527520:web:2a81788f614827300a71c5",
    measurementId: "G-5N7Y0CKHPY"
  };
}

class Firebase {
  // auth: firebase.auth.Auth;
  db: {};
  facebookAuthProvider: {};
  storage: {};
  constructor() {
    const app = !firebase.apps.length
      ? firebase.initializeApp(config)
      : firebase.app();
    // this.auth = app.auth();
    this.db = app.firestore();
    // this.storage = app.storage();
    // this.facebookAuthProvider = firebase.auth.FacebookAuthProvider.PROVIDER_ID;
  }
  // createUserWithEmailAndPassword = async (
  //   { email, password, firstName, lastName },
  //   rootUrl: string
  // ) => {
  //   const actionCodeSettings = {
  //     url: `${rootUrl}/auth`,
  //     handleCodeInApp: true
  //   };

  //   try {
  //     const userData = await this.auth.createUserWithEmailAndPassword(
  //       email,
  //       password
  //     );
  //     const displayName = `${firstName} ${lastName}`;

  //     await this.updateProfile(displayName);

  //     //Send email verification link
  //     await userData.user.sendEmailVerification(actionCodeSettings);

  //     message.success(
  //       "Your account was created - please verify using link in email."
  //     );

  //     Router.push("/email-sent/register");
  //   } catch (error) {
  //     const errorMessage = error.message;
  //     message.error(errorMessage);
  //   }
  // };

  // updateProfile = async displayName => {
  //   const user = this.auth.currentUser;

  //   try {
  //     const response = user.updateProfile({
  //       displayName
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     const errorMessage = error.message;
  //     message.error(errorMessage);
  //   }
  // };

  // signInWithEmailAndPassword = async ({ email, password }) => {
  //   try {
  //     const userData = await this.auth.signInWithEmailAndPassword(
  //       email,
  //       password
  //     );
  //     if (!userData.user.emailVerified) {
  //       message.error("Please verify your email.");
  //     } else {
  //       message.success("Sign in successfully.");
  //     }
  //   } catch (error) {
  //     const errorMessage = error.message;
  //     message.error(errorMessage);
  //   }
  // };

  // signInWithFacebook = async () => {
  //   const provider = new firebase.auth.FacebookAuthProvider();

  //   try {
  //     const response = await this.auth.signInWithPopup(provider);
  //     message.success("Sign in successfully.");
  //     return response;
  //   } catch (error) {
  //     const errorMessage = error.message;
  //     message.error(errorMessage);
  //   }
  // };

  // sendPasswordResetEmail = async (
  //   { email }: { email: string },
  //   rootUrl: string
  // ) => {
  //   const actionCodeSettings = {
  //     url: `${rootUrl}/auth`,
  //     handleCodeInApp: true
  //   };

  //   try {
  //     await this.auth.sendPasswordResetEmail(email, actionCodeSettings);
  //     message.success("Please check your email.");
  //     Router.push("/email-sent/forgot-password");
  //   } catch (error) {
  //     const errorMessage = error.message;
  //     message.error(errorMessage);
  //   }
  // };

  // updatePassword = async newPassword => {
  //   try {
  //     const user = this.auth.currentUser;
  //     const response = await user.updatePassword(newPassword);
  //     console.log(response);
  //   } catch (error) {
  //     const errorMessage = error.message;
  //     message.error(errorMessage);
  //   }
  // };

  // doSignOut = async () => {
  //   await this.auth.signOut();
  //   localStorage.removeItem("token");
  //   const text = "Successfully logged out.";
  //   message.success(text);
  // };
}

export { Firebase };
