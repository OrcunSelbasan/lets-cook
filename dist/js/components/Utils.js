// UTIL fetch
const fetchData = async (link) => {
    const response = await fetch(link);
    const data = await response.json();
  
    return data;
  };
  
// UTIL list items
function createListItem(selector, itemContent, className) {
  let ul = document.querySelector(selector);
  let li = document.createElement("li");
  (className === undefined)? li.className="": li.className = className;
  li.appendChild(document.createTextNode(itemContent));
  ul.appendChild(li);
}

export {fetchData, createListItem};