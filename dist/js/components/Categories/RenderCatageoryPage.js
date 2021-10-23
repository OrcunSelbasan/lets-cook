import { fetchData, createListItem } from "../Utils.js";

let clickedItem = localStorage.getItem("clickedItem");
let categoryName = document.querySelector(".categoryName");
let categoryDescription = document.querySelector(".categoryDescription");
let categoryRecipes = document.querySelector(".categoryRecipes");

const renderCategoryPage = () => {
  fetchData("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((data) => {
      data.categories.forEach((category) => {
        if (category["strCategory"] == clickedItem) {
          categoryName.innerText = category["strCategory"];
          categoryDescription.innerText = category["strCategoryDescription"];
          fetchData(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${clickedItem}`
          ).then((data) => {
            data.meals.forEach((meal) => {
              categoryRecipes.innerHTML += `<div class="card m-3" style="width: 18rem;">
                        <img src="${meal.strMealThumb}" class="card-img-top mt-3 rounded-3" alt="">
                        <div class="card-body d-flex flex-column justify-content-between">
                          <h5 class="card-title text-center">${meal.strMeal}</h5>    
                          <button class="btn btn-outline-primary" id="viewRecipe" data-bs-toggle="modal" data-bs-target="#exampleModal">View Recipe</button>
                        </div>
                    </div>`;
              let allRecipes = document.querySelectorAll("#viewRecipe");
              allRecipes.forEach((element) => {
                element.addEventListener("click", (e) => {
                  // Receive food name to search on api
                  let foodName =
                    e.target.parentElement.querySelector(
                      ".card-title"
                    ).innerText;

                  fetchData(
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
                  )
                    .then((data) => {
                      const obj = data.meals[0];

                      // Manipulates modal header according to recipe
                      document.querySelector("#exampleModalLabel").innerText =
                        obj.strMeal;

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
            });
          });
        }
      });
    })
    .catch((e) => console.log(e.message));
};

renderCategoryPage();

