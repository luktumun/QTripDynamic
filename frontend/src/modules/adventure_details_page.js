import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params = new URLSearchParams(search);
  let adventure = params.get("adventure");
  return adventure;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    let data = await response.json();
    return data;
  }
  catch (err){
    console.log("could not fetch data");
    return null
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").textContent += adventure.name;
  document.getElementById("adventure-subtitle").textContent += adventure.subtitle;

  //add images
  adventure.images.forEach((img) => document.getElementById("photo-gallery").innerHTML += `<div><img class="activity-card-image" src=${img} alt="${adventure.name}"></div>`);
  //add content
  document.getElementById("adventure-content").textContent += adventure.content;


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let parent = document.getElementById("photo-gallery");
  parent.className = "carousel slide";
  parent.setAttribute("data-bs-ride","carousel")
  parent.innerHTML = `<div class="carousel-indicators">
  </div>
  <div class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#photo-gallery" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#photo-gallery" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
  let indicatorContainer = document.getElementsByClassName("carousel-indicators")[0];
  let imagesContainer = document.getElementsByClassName("carousel-inner")[0];
  //for each img add required elements
  for (let i = 0; i < images.length; i++){
    if (i === 0) {
      indicatorContainer.innerHTML += `<button type="button" data-bs-target="#photo-gallery" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i+1}"></button>`;
      imagesContainer.innerHTML += `<div class="carousel-item active"><img src=${images[i]} class="activity-card-image" alt="Image ${i+1}"></div>`;
    }
    else {
      indicatorContainer.innerHTML += `<button type="button" data-bs-target="#photo-gallery" data-bs-slide-to="${i}" aria-current="true" aria-label="Slide ${i+1}"></button>`;
      imagesContainer.innerHTML += `<div class="carousel-item"><img src=${images[i]} class="activity-card-image" alt="Image ${i+1}"></div>`;
    }
  }
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let soldBanner = document.getElementById("reservation-panel-sold-out");
  let form = document.getElementById("reservation-panel-available");
  if (adventure.available) {
    soldBanner.style.display = "none";
    form.style.display = "block";
    let cost = document.getElementById("reservation-person-cost");
    cost.textContent = `${adventure.costPerHead}`;
  }
  else{
    soldBanner.style.display = "block";
    form.style.display = "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let total = adventure.costPerHead * parseInt(persons);
  document.getElementById("reservation-cost").innerHTML = total;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  let formData = document.getElementById("myForm");
  formData.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      name: formData.elements["name"].value,
      date: new Date(formData.elements["date"].value),
      person: parseInt(formData.elements["person"].value),
      adventure: adventure.id
    };
    const request = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type" : "application/json"
      }
    }
    let url = `${config.backendEndpoint}/reservations/new`
    fetch(url, request).then((data) => {
      if (!data.ok) {
        throw Error("Failed!");
      }
      return data.json();
    }).then((res) => {
      alert("Successs!");
    }).then(() => 
      window.location.reload()).catch((err) => {
        alert("Failed!");
    })
  })
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let banner = document.getElementById("reserved-banner");
  if (adventure.reserved) {
    banner.style.display = "block";
  }
  else {
    banner.style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
