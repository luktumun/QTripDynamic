
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  //search-> "?city=bengaluru" , return bengaluru
  let params = new URLSearchParams(search);
  let city = params.get("city");

  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let response = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    // console.log(response);
    let adv_list = await response.json();
    // console.log(adv_list);
    return adv_list
  }
  catch(err) {
    console.log("could not fetch data");
    return null
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //for each adventure
  adventures.forEach((adv) => {
    let parent = document.getElementById("data")
    //create column div
    let columnContainer = document.createElement("div");
    columnContainer.setAttribute("class", "col-6 col-lg-3 mb-4");
    //create card wrapped with anchor tag and relevant link
    //add img, body and banner
    columnContainer.innerHTML = `<a id ="${adv.id}" href="detail/?adventure=${adv.id}"> 
    <div class="activity-card">
      <div class="category-banner">${adv.category}</div>
      <img src="${adv.image}">
      <div class="w-100">
        <div class="d-block d-md-flex justify-content-between flex-wrap w-100 px-2">
          <h5>${adv.name}</h5>
          <p>₹${adv.costPerHead}</p>
        </div>
        <div class="d-block d-md-flex justify-content-between flex-wrap w-100 px-2">
          <h5>Duration</h5>
          <p>${adv.duration} Hours</p>
        </div>
      </div>
    </div>
    </a>`

    parent.appendChild(columnContainer)
  })
  
      
       

}
//Optional TODO: Module2
async function addNewAdventure(city) {
  try
  {
    let response = await fetch(`${config.backendEndpoint}/adventures/new`, {
      method: "POST",
      body: JSON.stringify({
          "city": `${city}`
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    });
    // console.log(data);
  }
  catch (err) {
    console.log(err);
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter((adventure) => (adventure.duration >= low && adventure.duration <= high));

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = list.filter((adventure) => {
    for (let i = 0; i < categoryList.length; i++){
      if (categoryList[i] === adventure.category) {
        return true;
      }
    }
    return false;
  });
  return filteredList
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  //extract list for duration and category
  let duration = filters.duration
  let categoryList = filters.category
  let filteredList = list;
  //invoke respective function if respective filter is not null
  //check if both filters are null
  if (duration == "" && categoryList.length === 0) {
    return filteredList;
  }
  else {
    //check if duration filter applied and update list
    if (duration != "") {
      let low_high = duration.split("-");
      let low = parseInt(low_high[0]);
      let high = parseInt(low_high[1]);
      filteredList = filterByDuration(filteredList, low, high); 
    }
    //check if category filter applied and update list
    if (categoryList.length !== 0) {
      filteredList = filterByCategory(filteredList, categoryList);
    }
    // console.log(filteredList);
    //return filtered list
    return filteredList
    
  }
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters = JSON.parse(window.localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value = filters.duration;
  let container = document.getElementById("category-list");

  filters.category.forEach((cat) => {
    let pill = document.createElement("span");
    pill.setAttribute("class", "category-filter");
    pill.innerHTML = `${cat}`;
    container.appendChild(pill);
  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  addNewAdventure,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
