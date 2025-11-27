import { collection, addDoc, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function criarSolicitacao(userId, descricao, nomeUsuario) {
  const solicitacoesRef = collection(db, "usuarios", userId, "solicitacoes");

  const dataAtual = new Date();
  const dataFormatada = dataAtual.toLocaleDateString("pt-BR");

  const novaSolicitacao = {
    titulo: `Solicitação ${nomeUsuario}`,
    status: "Nova",
    descricao,
    data: dataFormatada
  };

  await addDoc(solicitacoesRef, novaSolicitacao);
}

export async function getSolicitacoes(userId) {
  const solicitacoesRef = collection(db, "usuarios", userId, "solicitacoes");
  const snap = await getDocs(solicitacoesRef);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data()
  }));
}

export async function getSolicitacao(userId, solicitacaoId) {
  const ref = doc(db, "usuarios", userId, "solicitacoes", solicitacaoId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data();
}

export async function atualizarStatus(userId, solicitacaoId, novoStatus) {
  const ref = doc(db, "usuarios", userId, "solicitacoes", solicitacaoId);
  await updateDoc(ref, { status: novoStatus });
}