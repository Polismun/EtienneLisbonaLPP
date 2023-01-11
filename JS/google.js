import * as cards from "./displayCards.js";
import * as filters from "./displayFilters.js";
import { showListOfTags, tagsArray } from "./displayTags.js";
import { isFilterReload } from "./openCloseFilters.js";
import { deleteDuplicatesGoogled } from "./utils.js";

export let theMillTurns = (recipes, filter) => {
  let googledCards = [];

  recipes.map((recipe) => {

    if (
      recipe.name.toLowerCase().trim().includes(filter.toLowerCase().trim()) ||
      recipe.description
        .toLowerCase()
        .trim()
        .includes(filter.toLowerCase().trim()) ||
      recipe.appliance
        .toLowerCase()
        .trim()
        .includes(filter.toLowerCase().trim())
    ) {
      googledCards.push(recipe);
    }

    recipe.ustensils.filter((elt) => {
      if (elt.toLowerCase().includes(filter.toLowerCase())) {
        googledCards.push(recipe);
      }
    });

    recipe.ingredients.map((ingredient) => {
      if (
        ingredient.ingredient
          .toLowerCase()
          .trim()
          .includes(filter.toLowerCase().trim())
      ) {

        googledCards.push(recipe);
      }
    });
  });
  // console.log(googledCards);
  return googledCards;
};

export let IS_GOOGLE = (recipes) => {
  const takeIt = document.querySelector(".search__input");

  takeIt.addEventListener("input", () => {
    if (takeIt.value.length > 2) {
      //   console.log(takeIt.value);
      const googledRecipes = theMillTurns(recipes, takeIt.value);
      const googledRecipesDistinct = deleteDuplicatesGoogled(googledRecipes);
      // console.log(googledRecipesDistinct);
      cards.DISPLAY_CARDS(googledRecipesDistinct);
      filters.DISPLAY_FILTERS(googledRecipesDistinct);
      isFilterReload(recipes);
    } else {
      cards.DISPLAY_CARDS(recipes);
      isFilterReload(recipes)
      // console.log(tagsArray);
      while (tagsArray.length > 0) {
        tagsArray.pop();
      }
      // console.log(tagsArray);
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
      // console.log(e);

      while (tagsArray.length > 0) {
        tagsArray.pop();
      }
      // console.log(tagsArray);
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
