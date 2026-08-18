import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let response = await fetch(`${config.backendEndpoint}/reservations`);
    let data = await response.json();
    return data
  }
  catch (err) {
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  let banner = document.getElementById("no-reservation-banner");
  let table = document.getElementById("reservation-table-parent");
  if (reservations.length === 0) {
    banner.style.display = "block";
    table.style.display = "none";
  }
  else {
    banner.style.display = "none";
    table.style.display = "block";
    let tableBody = document.getElementById("reservation-table");
    reservations.forEach((obj) => {
      let date = new Date(obj.date);
      let reservedDate = date.toLocaleDateString("en-IN");
      let booking = new Date(obj.time);
      let bookingDate = booking.toLocaleString("en-IN", { dateStyle: "long" });
      let bookingTime = booking.toLocaleString("en-IN", { timeStyle: "medium" });

      tableBody.innerHTML += `<tr>
      <td><b>${obj.id}</b></td>
      <td>${obj.name}</td>
      <td>${obj.adventureName}</td>
      <td>${obj.person}</td>
      <td>${reservedDate}</td>
      <td>${obj.price}</td>
      <td>${bookingDate}, ${bookingTime}</td>
      <td><button id="${obj.id}" class="reservation-visit-button"><a href="../detail/?adventure=${obj.adventure}">Visit Adventure</a></button></td>
      </tr>`
    })
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
