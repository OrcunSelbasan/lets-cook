import { fetchData, createListItem} from "../Utils.js";
// List Categories
const createHeroCategories = () => fetchData("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then((data) => {
    data.categories.forEach((category) =>
      createListItem(".categories-list", category["strCategory"], "category-item")
    );
    Array.from(document.getElementsByClassName('category-item')).forEach(element => {
        let temp = element.innerText;
        element.innerHTML = `<a onclick="localStorage.setItem('clickedItem','${temp}');" href="./pages/categories.html">${temp}</a>`;
        localStorage.setItem(`${temp}`, temp);
    })
  })
  .catch((e) => alert(e.message));

export {createHeroCategories};