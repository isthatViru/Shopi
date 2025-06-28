// src/components/cartUtils.js
import { db, auth } from '../firebase';
import { ref, get, set } from 'firebase/database';

export const getCart = async () => {
  const user = auth.currentUser;
  if (!user) return [];
  const cartRef = ref(db, `carts/${user.uid}`);
  const snapshot = await get(cartRef);
  return snapshot.exists() ? snapshot.val() : [];
};

export const saveCart = async (cart) => {
  const user = auth.currentUser;
  if (!user) return;
  const cartRef = ref(db, `carts/${user.uid}`);
  await set(cartRef, cart);
};
