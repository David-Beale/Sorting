// Fisher–Yates shuffle

export const shuffle = (list) => {
  const newList = list.slice();
  for (let i = 0; i < newList.length - 1; i++) {
    //random index between i and list.length
    const randomIndex = Math.floor(Math.random() * (newList.length - i)) + i;
    [newList[i], newList[randomIndex]] = [newList[randomIndex], newList[i]];
  }
  return newList;
};
