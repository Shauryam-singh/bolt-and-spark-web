import { auth } from "@/integrations/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";

/**
 * Sign up using email and password
 */
export async function signUp(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Sign in using email and password
 */
export async function signIn(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Sign in using Google account
 */
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

/**
 * Sign out the current user
 */
export async function signOut() {
  await firebaseSignOut(auth);
}
