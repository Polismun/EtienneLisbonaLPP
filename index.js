console.time("index.js");
("use strict");

import { renderRecipes } from "./JS/api.js";
import * as cards from "./JS/displayCards.js";
import * as filters from "./JS/displayFilters.js";
import * as openclosefilters from "./JS/openCloseFilters.js";
import * as google from "./JS/google.js";

export const GET_RECIPES_HYDRATE = (renderRecipes.prototype.getAllRecipes =
  function (recipes) {
    // console.log(recipes);
    cards.DISPLAY_CARDS(recipes);
    filters.DISPLAY_FILTERS(recipes);
    google.IS_GOOGLE(recipes);
    google.IS_TAGGED(recipes);
    return recipes;
  });


let buttons = document.querySelectorAll(".filter__select");
let buttonValue;
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttonValue = btn.getAttribute("value");
    openclosefilters.isFiltersInteractive(btn, buttonValue);
  });
});


console.timeEnd("index.js");

setTimeout(() => {
  console.clear("this is the first message");
}, 7000);

