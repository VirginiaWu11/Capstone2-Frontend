import { homeImageArr } from "./constants";
export const getRandomHomeImage = () => {
  return homeImageArr.at(Math.random() * homeImageArr.length);
};
