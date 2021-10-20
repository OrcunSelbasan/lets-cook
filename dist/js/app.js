import {createHeroCategories} from "./components/Hero/HeroSectionCategories.js";
import {randomCarouselRecipes, recipeEvent} from "./components/Hero/HeroSectionCarousel.js";
import { createAreaDropdownOptions, displayRecipes } from "./components/Area/AreaSectionDropdown.js";

createHeroCategories();
randomCarouselRecipes();
createAreaDropdownOptions();
displayRecipes();
recipeEvent();