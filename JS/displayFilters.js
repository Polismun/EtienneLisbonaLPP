

import { renderRecipes } from "./api.js";
import * as utils from "./utils.js";
import { listenFilter } from "./displayTags.js";

var distinctIngredients = [];
var distinctAppliance = [];
var distinctUstensils = [];

export const displayFilterIngredients =
  (renderRecipes.prototype.displayFilterIngredients = function (data, filter) {
    for (const recipe of data) {

      for (const ingredient of recipe.ingredients) {
        let currentIngredient = ingredient.ingredient.toLowerCase().trim();

        if (distinctIngredients.length === 0) {
          distinctIngredients.push(currentIngredient);

        } else {
          let isIn = false;
          for (const itemInIngredients of distinctIngredients) {

            if (itemInIngredients === currentIngredient) {
              isIn = true;
            }
          }
          if (!isIn) {
            distinctIngredients.push(currentIngredient);
          }
        }
      }
    }


    if (filter) {
      return distinctIngredients.filter((ingredient) =>
        ingredient.includes(filter.toLowerCase().trim())
      );
    }

    return distinctIngredients;
  });


export const displayFilterAppliance =
  (renderRecipes.prototype.displayFilterAppliance = function (data, filter) {
    for (const recipe of data) {

      let currentAppliance = recipe.appliance.toLowerCase().trim();

      if (distinctAppliance.length === 0) {
        distinctAppliance.push(currentAppliance);

      } else {
        let isIn = false;
        for (const itemInAppliance of distinctAppliance) {

          if (itemInAppliance === currentAppliance) {
            isIn = true;
          }
        }
        if (!isIn) {
          distinctAppliance.push(currentAppliance);
        }
      }

    }


    if (filter) {
      return distinctAppliance.filter((appliance) =>
        appliance.includes(filter.toLowerCase().trim())
      );
    }

    return distinctAppliance;
  });

export const displayFilterUstensils =
  (renderRecipes.prototype.displayFilterUstensils = function (data, filter) {
    for (const recipe of data) {

      for (const ustensil of recipe.ustensils) {
        let currentUstensil = ustensil.toLowerCase().trim();

        if (distinctUstensils.length === 0) {
          distinctUstensils.push(currentUstensil);

        } else {
          let isIn = false;
          for (const itemInUstensils of distinctUstensils) {

            if (itemInUstensils === currentUstensil) {
              isIn = true;
            }
          }
          if (!isIn) {
            distinctUstensils.push(currentUstensil);
          }
        }
      }
    }


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
