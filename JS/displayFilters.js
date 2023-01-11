

import { renderRecipes } from "./api.js";
import * as utils from "./utils.js";
import { listenFilter } from "./displayTags.js";

export const displayFilterIngredients =
  (renderRecipes.prototype.displayFilterIngredients = function (data, filter) {

    const distinctIngredients = [
      ...new Set(
        data
          .map((recipe) =>
            recipe.ingredients.map((ingredient) =>
              ingredient.ingredient.toLowerCase().trim()
            )
          )
          .flat()
          .sort()
      ),
    ];

    if (filter) {
   
      return distinctIngredients.filter((ingredient) =>
        ingredient.includes(filter.toLowerCase().trim())
      );
    }

    return utils.shuffle(distinctIngredients);
  });


export const displayFilterAppliance =
  (renderRecipes.prototype.displayFilterAppliance = function (data, filter) {

    const distinctAppliance = [
      ...new Set(
        data.map((recipe) => recipe.appliance.toLowerCase().trim()).sort()
      ),
    ];

    if (filter) {
      return distinctAppliance.filter((appliance) =>
        appliance.includes(filter.toLowerCase().trim())
      );
    }

    return distinctAppliance;
  });

export const displayFilterUstensils =
  (renderRecipes.prototype.displayFilterUstensils = function (data, filter) {

    const distinctUstensils = [
      ...new Set(
        data
          .map((recipe) =>
            recipe.ustensils.map((item) => item.toLowerCase().trim())
          )
          .flat()
          .sort()
      ),
    ];

    if (filter) {
      return distinctUstensils.filter((ustensil) =>
        ustensil.includes(filter.toLowerCase().trim())
      );
    }

    return distinctUstensils;
  });

const list_HTML = (renderRecipes.prototype.getList_HTML = (
  distinctData,
  datacolor
) => {

  let li_HTML = "";
  distinctData.map((setLi) => {
    li_HTML += `<li class="filter__custom-option" data-color="${datacolor}">${utils.capitalize(
      setLi
    )}</li>`;
  });

  return li_HTML;
});


export const hydrateFilter = (renderRecipes.prototype.hydrateFilter = function (
  data,
  value,
  btn,
  datacolor,
  filter
) {

  switch (value) {
    case "Ingrédients":

      btn.insertAdjacentHTML(
        "afterend",
        `
        <ul class="filter__custom-menu filter__custom-menu--primary">
      ${list_HTML(displayFilterIngredients(data, filter), datacolor)}
      </ul>`
      );
      break;
    case "Appareil":
      btn.insertAdjacentHTML(
        "afterend",
        `
        <ul class="filter__custom-menu filter__custom-menu--success">
      ${list_HTML(displayFilterAppliance(data, filter), datacolor)}
      </ul>`
      );
      break;
    case "Ustensiles":
      btn.insertAdjacentHTML(
        "afterend",
        `
        <ul class="filter__custom-menu filter__custom-menu--danger">
      ${list_HTML(displayFilterUstensils(data, filter), datacolor)}
      </ul>`
      );
      break;
    default:
      break;
  }
});


export const DISPLAY_FILTERS = (renderRecipes.displayFilters = function (
  data,
  btn,
  filter,
  value,
  color
) {
  if (btn && filter && value && color) {

    hydrateFilter(data, value, btn, color, filter);
  } else if (data) {
    document.querySelectorAll(".filter__select").forEach((button) => {
      let value = button.getAttribute("value");

      let datacolor = button.getAttribute("data-color");


      hydrateFilter(data, value, button, datacolor);
    });
  }


  listenFilter(data, document.querySelectorAll(".filter__custom-option"));
});
