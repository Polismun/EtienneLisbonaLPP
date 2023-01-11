

import { renderRecipes } from "./api.js";
import * as filters from "./displayFilters.js";

export const isFiltersInteractive =
  (renderRecipes.prototype.isFiltersInteractive = (btn, buttonValue) => {

    const displayKeyword = btn.nextElementSibling;
    if (displayKeyword.classList.contains("filter__show")) {
      closeSelectFilter(

        displayKeyword.previousElementSibling,
        displayKeyword,
        displayKeyword.parentNode,
        displayKeyword.parentNode.firstElementChild
      );
    } else {
      isFilterClosed();
      changeInputTypeInText(btn, buttonValue);
    }
  });

export const closeSelectFilter = (renderRecipes.prototype.closeSelectFilter = (
  inputBtn,
  filterShow,
  parentWidth,
  rotateArrow
) => {
  inputBtn.setAttribute("type", "button");
  inputBtn.setAttribute("value", `${inputBtn.getAttribute("data-value")}`);
  inputBtn.removeAttribute("placeholder");
  filterShow.classList.remove("filter__show");
  parentWidth.style.width = "170px";
  rotateArrow.classList.remove("filter__custom-arrow--rotate");
});

export const isFilterClosed = (renderRecipes.prototype.isFilterClosed = () => {
  document.querySelectorAll(".filter__custom-menu").forEach((filter) => {
    if (filter.classList.contains("filter__show")) {
      closeSelectFilter(
        filter.previousElementSibling,
        filter,
        filter.parentNode,
        filter.parentNode.firstElementChild
      );
    }
  });
});

export const isFilterReload = (renderRecipes.prototype.isFilterClosed = (
  data
) => {
  document.querySelectorAll(".filter__custom-menu").forEach((filter) => {
    if (filter.classList.contains("filter__show")) {
      let btn = filter.previousElementSibling;
      let btnvalue = btn.getAttribute("value");
      document.querySelectorAll(".filter__custom-menu").forEach((ul) => {
        ul.remove();
      });
      filters.DISPLAY_FILTERS(data);
      changeInputTypeInText(btn, btnvalue);
    }
  });
});

export const changeInputTypeInText =
  (renderRecipes.prototype.changeInputTypeInText = (button, buttonValue) => {
    button.setAttribute("type", "text");
    button.setAttribute("data-value", `${buttonValue}`);
    button.value = "";

    switch (buttonValue) {
      case "Appareil":
        button.parentNode.style.width = "66%";
        button.setAttribute("placeholder", "Recherche un appareil");
        button.nextElementSibling.classList.add("filter__show");
        button.previousElementSibling.classList.add(
          "filter__custom-arrow--rotate"
        );

        break;
      case "Ingrédients":
        button.parentNode.style.width = "66%";
        button.setAttribute("placeholder", "Recherche un ingrédient");
        button.nextElementSibling.classList.add("filter__show");
        button.previousElementSibling.classList.add(
          "filter__custom-arrow--rotate"
        );

        break;
      case "Ustensiles":
        button.parentNode.style.width = "66%";
        button.setAttribute("placeholder", "Recherche un ustensile");
        button.nextElementSibling.classList.add("filter__show");
        button.previousElementSibling.classList.add(
          "filter__custom-arrow--rotate"
        );

        break;
      default:
        break;
    }
  });
