

import * as cards from "./displayCards.js";
import * as filters from "./displayFilters.js";
import { showListOfTags, tagsArray } from "./displayTags.js";
import { isFilterReload } from "./openCloseFilters.js";
import { deleteDuplicatesGoogled } from "./utils.js";

export let theMillTurns = (recipes, filter) => {

  let googledCards = [];

  for (let recipe of recipes) {

    if (

      recipe.name.toLowerCase().trim().indexOf(filter.toLowerCase().trim()) >
        -1 ||
      recipe.description
        .toLowerCase()
        .trim()
        .indexOf(filter.toLowerCase().trim()) > -1 ||

      recipe.appliance
        .toLowerCase()
        .trim()
        .indexOf(filter.toLowerCase().trim()) > -1
    ) {
      googledCards.push(recipe);

      continue;
    }

    for (let ustensil of recipe.ustensils) {
      if (
        ustensil.toLowerCase().trim().indexOf(filter.toLowerCase().trim()) > -1
      ) {
        googledCards.push(recipe);
        break;
      }
    }

    for (let ingredient of recipe.ingredients) {
      if (
        ingredient.ingredient
          .toLowerCase()
          .trim()
          .indexOf(filter.toLowerCase().trim()) > -1
      ) {
        googledCards.push(recipe);
        break;
      }
    }
  }

  return googledCards;
};


export let IS_GOOGLE = (recipes) => {
  const takeIt = document.querySelector(".search__input");

  takeIt.addEventListener("input", () => {

    if (takeIt.value.length > 2) {

      const googledRecipes = theMillTurns(recipes, takeIt.value);
      const googledRecipesDistinct = deleteDuplicatesGoogled(googledRecipes);

      cards.DISPLAY_CARDS(googledRecipesDistinct);
      filters.DISPLAY_FILTERS(googledRecipesDistinct);
      isFilterReload(recipes);
    } else {

      cards.DISPLAY_CARDS(recipes);
      isFilterReload(recipes);

      while (tagsArray.length > 0) {
        tagsArray.pop();
      }

      showListOfTags(tagsArray);

      document.querySelectorAll(".filter__custom-option").forEach((li) => {
        li.classList.add("filter__custom-option");
        li.classList.remove("filter__custom-option--enable");
      });
    }
  });
};


export let IS_TAGGED = (recipes) => {

  const takeFilter = document.querySelectorAll(".filter__select");

  takeFilter.forEach((input) => {
    input.addEventListener("input", (e) => {
      e.preventDefault();
      e.stopPropagation();

      while (tagsArray.length > 0) {
        tagsArray.pop();
      }

      showListOfTags(tagsArray);
      cards.DISPLAY_CARDS(recipes);

      let value = input.getAttribute("data-value");
      let color = input.getAttribute("data-color");

      input.nextElementSibling.remove();

      filters.DISPLAY_FILTERS(recipes, input, input.value, value, color);
      input.parentNode.style.width = "66%";
      input.setAttribute("placeholder", "Recherche un ingrédient");
      input.nextElementSibling.classList.add("filter__show");
      input.previousElementSibling.classList.add(
        "filter__custom-arrow--rotate"
      );
    });
  });
};
