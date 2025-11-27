import { collection, getDocs, addDoc, query, where, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";

export async function login(email, senha) {
  if (!email || !senha) return null;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    const userDocRef = doc(db, "usuarios", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return { ...userDoc.data(), id: user.uid };
    } else {
      return { id: user.uid, tipoUsuario: "cliente" };
    }
  } catch (error) {
    console.error("Erro no login:", error);
    return null;
  }
}

export async function cadastro(nome, email, senha) {
  if (!nome || !email || !senha) throw new Error("Campos inválidos.");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    await addDoc(collection(db, "usuarios"), {
      nome, 
      email, 
      tipoUsuario: "cliente"
    });

    return { id: user.uid, tipoUsuario: "cliente" };
  } catch (error) {
    console.error("Erro no cadastro:", error);
    throw error;
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error;
  }
}

export async function getUsuarioData(uid) {
  try {
    const userDocRef = doc(db, "usuarios", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return { ...userDoc.data(), id: uid };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    return null;
  }
}