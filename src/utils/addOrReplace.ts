export const addOrReplaceSathi = (arr, obj) => {
  let index = arr.findIndex((object) => obj.uid === object.uid);
  if (index === -1) {
    index = arr.length;
  }
  arr[index] = obj;
  return arr;
};
