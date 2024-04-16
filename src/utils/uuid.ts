export const genUUID = () => {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }
  const random = new Uint32Array(4);
  window.crypto.getRandomValues(random);
  return window.crypto.getRandomValues(random).join('-');
};
