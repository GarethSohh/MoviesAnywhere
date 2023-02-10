const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const title = document.getElementById("movie-title");

const urlParams = window.location.search

title.innerHTML = urlParams.split("=")[1].replaceAll("+", " ")

var realTitle = title.innerHTML;

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = (selectedSeatsCount * ticketPrice).toFixed(2);

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}


// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        console.log(seat.classList.add("selected"));
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    console.log(selectedMovieIndex)
  }
}
console.log(populateUI())
// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();

function addBooking() {
  var response = "";

  var username = sessionStorage.getItem("name");
  var selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  var selectedSeatsCount = selectedSeats.length;
  var total = selectedSeatsCount * ticketPrice

  var jsonData = new Object();
  jsonData.username = username;
  jsonData.movieName = realTitle;
  if (document.getElementById("movie").value % 8.00 === 0) {
    jsonData.theatre = "Golden Village"
  } else if (document.getElementById("movie").value % 9.00 === 0) {
    jsonData.theatre = "Cathay"
  } else {
    jsonData.theatre = "SHAW Theatres"
  }
  jsonData.seat = selectedSeats;
  jsonData.numOfSeats = selectedSeatsCount;
  jsonData.date = document.getElementById("dateOfMovie").value;
  jsonData.time = document.getElementById("time").value;
  jsonData.price = total;

  var request = new XMLHttpRequest();

  request.open("POST", "https://f6e5725rxh.execute-api.us-east-1.amazonaws.com/bookings/booking-add", true);

  request.setRequestHeader("lambdaauthoriser", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZmZlY3QiOiJzZWNyZXQiLCJpYXQiOjE2NzIxNDQ3ODl9.02LO52OL6NTQs4FCnw6uByNuyvb9d4TRZWibZyvEOO4")

  request.onload = function () {
    response = JSON.parse(request.responseText);

    if (response.message == "booking has been done") {
      alert('Booking Added.');
      location.reload();
    }
    else {
      alert('Error. Unable to add new booking.');
      console.log(response.message)
    }
  };

  request.send(JSON.stringify(jsonData));
}