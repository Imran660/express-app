exports.getBodyDataLength = (obj) => {
  if (!obj) return 0;
  return Object.keys(obj).length;
};
