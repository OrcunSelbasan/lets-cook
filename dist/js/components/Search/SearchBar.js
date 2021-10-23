import { fetchData } from "../Utils.js";

const searchBtn = document.querySelector(".searchBtn");
let searchInput = document.querySelector(".searchInput");
const clearBtn = document.querySelector(".clearBtn");
let searchResults = document.querySelector(".search-results");

const search = () =>
  searchBtn.addEventListener("click", (e) => {
    let searchVal = searchInput.value;
    if (searchVal !== "") {
      if (searchVal.length > 1) {
        fetchData(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchVal}`
        )
          .then((data) => {
            if (searchResults.innerHTML.length > 0) {
              searchResults.innerHTML = "";
              data.meals.forEach((meal) => {
                searchResults.innerHTML += `
                                <div class="card m-3" style="width: 18rem;">
                                    <img src="${meal["strMealThumb"]}" class="card-img-top mt-3 rounded-3" alt="">
                                    <div class="card-body d-flex flex-column justify-content-between">
                                      <h5 class="card-title text-center">${meal["strMeal"]}</h5>                        
                                      <a href="./pages/search.html" class="btn btn-outline-primary" id="${meal.idMeal}" onclick="localStorage.setItem('searchID',${meal.idMeal})">View Recipe</a>
                                    </div>
                                </div>
                             `;
              });
            } else {
              data.meals.forEach((meal) => {
                searchResults.innerHTML += `
                                <div class="card m-3" style="width: 18rem;">
                                    <img src="${meal["strMealThumb"]}" class="card-img-top mt-3 rounded-3" alt="">
                                    <div class="card-body d-flex flex-column justify-content-between">
                                      <h5 class="card-title text-center">${meal["strMeal"]}</h5>                        
                                      <a href="./pages/search.html" class="btn btn-outline-primary" id="${meal.idMeal}" onclick="localStorage.setItem('searchID',${meal.idMeal})">View Recipe</a>
                                    </div>
                                </div>
                             `;
              });
            }
          })
          .catch((e) => {
            console.log(e.message);
            searchResults.innerHTML =
              "<p class='display-3 text-center'>Oops, Couldn't Find It</p>";
            fetchData(
              `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchVal[0]}`
            )
              .then((data) => {
                document.querySelector(".error").innerContent =
                  "Oops, Couldn't Find It";
                if (searchResults.innerHTML.length > 0) {
                  searchResults.innerHTML =
                    "<p class='display-3 text-center'>Sorry, I couldn't find it :( Maybe you like those</p>";
                  data.meals.forEach((meal) => {
                    searchResults.innerHTML += `
                                      <div class="card m-3" style="width: 18rem;">
                                          <img src="${meal["strMealThumb"]}" class="card-img-top mt-3 rounded-3" alt="">
                                          <div class="card-body d-flex flex-column justify-content-between">
                                            <h5 class="card-title text-center">${meal["strMeal"]}</h5>                        
                                            <a href="./pages/search.html" class="btn btn-outline-primary" id="${meal.idMeal}" onclick="localStorage.setItem('searchID',${meal.idMeal})">View Recipe</a>
                                          </div>
                                      </div>
                                   `;
                  });
                } else {
                  data.meals.forEach((meal) => {
                    searchResults.innerHTML += `
                                      <div class="card m-3" style="width: 18rem;">
                                          <img src="${meal["strMealThumb"]}" class="card-img-top mt-3 rounded-3" alt="">
                                          <div class="card-body d-flex flex-column justify-content-between">
                                            <h5 class="card-title text-center">${meal["strMeal"]}</h5>                        
                                            <a href="./pages/search.html" class="btn btn-outline-primary" id="${meal.idMeal}" onclick="localStorage.setItem('searchID',${meal.idMeal})">View Recipe</a>
                                          </div>
                                      </div>
                                   `;
                  });
                }
              })
              .catch((e) => {
                console.log(e.message);
                searchResults.innerHTML =
                  "<p class='display-3 text-center'>Oops, Couldn't Find It</p>";
              });
          });
      } else {
        fetchData(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchVal}`
        )
          .then((data) => {
            if (searchResults.innerHTML.length > 0) {
              searchResults.innerHTML = "";
              data.meals.forEach((meal) => {
                searchResults.innerHTML += `
                                <div class="card m-3" style="width: 18rem;">
                                    <img src="${meal["strMealThumb"]}" class="card-img-top mt-3 rounded-3" alt="">
                                    <div class="card-body d-flex flex-column justify-content-between">
                                      <h5 class="card-title text-center">${meal["strMeal"]}</h5>                        
                                      <a href="./pages/search.html" class="btn btn-outline-primary" id="${meal.idMeal}" onclick="localStorage.setItem('searchID',${meal.idMeal})">View Recipe</a>
                                    </div>
                                </div>
                             `;
              });
            } else {
              data.meals.forEach((meal) => {
                searchResults.innerHTML += `
                                <div class="card m-3" style="width: 18rem;">
                                    <img src="${meal["strMealThumb"]}" class="card-img-top mt-3 rounded-3" alt="">
                                    <div class="card-body d-flex flex-column justify-content-between">
                                      <h5 class="card-title text-center">${meal["strMeal"]}</h5>                        
                                      <a href="./pages/search.html" class="btn btn-outline-primary" id="${meal.idMeal}" onclick="localStorage.setItem('searchID',${meal.idMeal})">View Recipe</a>
                                    </div>
                                </div>
                             `;
              });
            }
          })
          .catch((e) => {
            console.log(e.message);
            searchResults.innerHTML =
              "<p class='display-3 text-center'>Oops, Couldn't Find It</p>";
          });
      }
    } else {
      e.preventDefault();
      searchResults.innerHTML =
              "<p class='display-4 text-center'>Empty Search :/</p>";
    }

  });

const clear = () => {
    clearBtn.addEventListener("click", (e) => {
        searchResults.innerHTML = "";
        searchInput.value = "";
    })
}
export { search, clear };
