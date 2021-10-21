import { fetchData, createListItem} from "../Utils.js";

let recipeHeader = document.getElementsByClassName("recipe-header");
let carouselImage = document.getElementsByClassName("carousel-image");
let tryRecipe = document.querySelectorAll("#viewRecipe");

// Carousel Recipes
const randomCarouselRecipes = () => {
  let upperbound = 3; 
  let carouselRecipes = [];
  for (let i = 0; i < upperbound; i++) {
    fetchData("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((data) => {
        if (!carouselRecipes.includes(data.meals[0].strMeal)) { 
          recipeHeader[i].innerText = data.meals[0].strMeal;
          carouselImage[i].setAttribute("src", data.meals[0].strMealThumb);
          carouselRecipes.push(data.meals[0].strMeal)
        } else {
          upperbound++;
        }
      })
      .catch((e) => console.log(e.message));
  }
};
// Carousel button event
const recipeEvent = () =>
  tryRecipe.forEach((element) => {
    element.addEventListener("click", (e) => {
      // Receive food name to search on api
      let foodName =
        e.target.parentElement.querySelector(".recipe-header").innerText;

      fetchData(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
      )
        .then((data) => {
          const obj = data.meals[0];

          // Manipulates modal header according to recipe
          document.querySelector("#exampleModalLabel").innerText = obj.strMeal;

          // Lists ingredients
          for (let i = 1; i < 21; i++) {
            let propName = `strIngredient${i}`;
            if (obj[propName] != null && obj[propName] != "") {
              let first = obj[propName].charAt(0).toUpperCase();
              let rest = obj[propName].substring(1);
              createListItem("#ingredients", first + rest);
            }
          }

          let instructions = obj.strInstructions;
          let pTag = document
            .querySelector("#instructions")
            .appendChild(document.createTextNode(instructions));
          // document.querySelector(".modal-body").appendChild(pTag)
        })
        .catch((e) => alert(e.message));
      document.querySelector("#ingredients").innerHTML = "";
      document.querySelector("#instructions").innerHTML = "";
    });
});

export {randomCarouselRecipes, recipeEvent};
