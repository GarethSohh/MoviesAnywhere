// // Booking data
// const bookings = [
//     { id: 1, name: "John Doe", email: "johndoe@example.com", phone: "555-555-5555" },
//     { id: 2, name: "Jane Doe", email: "janedoe@example.com", phone: "555-555-5556" },
//     // ...
//   ];

// Function to display the booking list
function displayBookingList() {

    var response = "";

    var request = new XMLHttpRequest();

    request.open("GET", "https://f6e5725rxh.execute-api.us-east-1.amazonaws.com/bookings/booking-get", true);

    request.setRequestHeader("lambdaauthoriser", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZmZlY3QiOiJzZWNyZXQiLCJpYXQiOjE2NzIxNDQ3ODl9.02LO52OL6NTQs4FCnw6uByNuyvb9d4TRZWibZyvEOO4")

    request.onload = function () {
        response = JSON.parse(request.responseText).Items;
        console.log(response);

        var html = "";
        var max = response.length;

        for (var i = 0; i < max; i++) {
            if (sessionStorage.getItem("name") === response[i].username) {
                html += `
            <tr>
              <th scope="row">${response[i].movieName}</th>
              <td>${response[i].date}</td>
              <td>${response[i].time}</td>
              <td>${response[i].seat}</td>
              <td>${response[i].numOfSeats}</td>
              <td>${response[i].theatre}</td>
              <td>${response[i].price}</td>
              <td><a class="fa fa-trash" onclick="deleteBooking('${response[i].movieName}', '${response[i].username}')" href="#"></a></td>
            </tr>
          `;
            }

        }


        document.getElementById("booking-list").innerHTML = html;



    }

    request.send();
}

function deleteBooking(movieName, username) {
    console.log(movieName, username)
    var request = new XMLHttpRequest();

    request.open("DELETE", "https://f6e5725rxh.execute-api.us-east-1.amazonaws.com/bookings/booking-delete/" + movieName.replaceAll(" ", "+") + "/" + username.replaceAll(" ", "+"), true);

    request.setRequestHeader("lambdaauthoriser", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZmZlY3QiOiJzZWNyZXQiLCJpYXQiOjE2NzIxNDQ3ODl9.02LO52OL6NTQs4FCnw6uByNuyvb9d4TRZWibZyvEOO4")
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "booking deleted") {
            alert('Booking deleted successfully.');
        }
        else {
            alert('Error. Unable to delete booking.');
        }
    };

    request.send();
}

displayBookingList();