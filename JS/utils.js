// console.log("%c utils.js", "color: green; font-weight:bold;");

import { DISPLAY_FILTERS } from "./displayFilters.js";
import { GET_RECIPES_HYDRATE } from "../index.js";
import { renderRecipes } from "./api.js";


export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};


export const deleteDuplicates = (array) => {
  let cleanDuplicate = [];
  array.forEach((item) => {
    cleanDuplicate.indexOf(item) == -1 ? cleanDuplicate.push(item) : "";
    return cleanDuplicate;
  });
};


export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


export const windowLocationReload = () => {


};


export const tagIsNoneSuccess = () => {
  document.getElementsByClassName("tags__item--success").style.display = "none";
};
export const tagIsNoneDanger = () => {
  document.getElementsByClassName("tags__item--danger").style.display = "none";
};
export const tagIsNonePrimary = () => {
  document.getElementsByClassName("tags__item--primary").style.display = "none";
};

export const deleteDuplicatesGoogled = (array) => {
  let cleanDuplicate = [];
  array.forEach((item) => {

    cleanDuplicate.indexOf(item) == -1 ? cleanDuplicate.push(item) : "";
  });
 
  return cleanDuplicate;
};
