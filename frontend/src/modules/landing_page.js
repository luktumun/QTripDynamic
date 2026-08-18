import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let response = await fetch(`${config.backendEndpoint}/cities`);
    // console.log(response);
    let city_list = await response.json();
    // console.log(city_list);
    return city_list
  }
  catch(err) {
    console.log("could not fetch data");
    return null
  } 
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let parent = document.getElementById("data");
  //create div with class col-6 col-lg-3 mb-4
  let columnContainer = document.createElement("div");
  columnContainer.setAttribute("class", "col-6 col-lg-3 mb-4");
  //create tile and add relevant content to tile using parameters
  columnContainer.innerHTML = `
  <a href ="pages/adventures/?city=${id}">
    <div class ="tile" id="${id}">
    <div class="tile-text text-center">
        <h5>${city}</h5>
        <p>${description}</p>
    </div>  
    <img src="${image}", alt="${id}">
    </div >
  </a>`;
  parent.appendChild(columnContainer)
}

export { init, fetchCities, addCityToDOM };
