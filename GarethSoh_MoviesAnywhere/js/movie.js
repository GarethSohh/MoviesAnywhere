function getMovies(num) {
	var response = "";

	var request = new XMLHttpRequest();

	request.open("GET", "https://f6e5725rxh.execute-api.us-east-1.amazonaws.com/movies/movie-get", true);

	request.setRequestHeader("lambdaauthoriser", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZmZlY3QiOiJzZWNyZXQiLCJpYXQiOjE2NzIxNDQ3ODl9.02LO52OL6NTQs4FCnw6uByNuyvb9d4TRZWibZyvEOO4")

	request.onload = function () {
		response = JSON.parse(request.responseText).Items;
		console.log(response);

		var html = "";
		var max = num;
		if (response.length < max) max = response.length;

		for (var i = 0; i < max; i++) {
			html += `
				<div class="movie-list-item">
					<img class="movie-list-item-img" id="img" src="${response[i].image}" alt=""></img>
					<span class="movie-list-item-title" id="title">${response[i].movie}</span>
					<p class="movie-list-item-desc" id="description">${response[i].description}</p>
					<a href="#" onclick="getSelectedMovie('${response[i].movie}')" data-toggle="modal" data-target="#selectedMovie" class="movie-list-item-button">View More</a>
				</div>`
		}

		document.getElementById("moviesList").innerHTML = html;

		const arrows = document.querySelectorAll(".arrow");
		const movieLists = document.querySelectorAll(".movie-list");

		arrows.forEach((arrow, i) => {
			const itemNumber = movieLists[i].querySelectorAll("img").length;
			let clickCounter = 0;
			arrow.addEventListener("click", () => {
				const ratio = Math.floor(window.innerWidth / 270);
				clickCounter++;
				if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
					movieLists[i].style.transform = `translateX(${movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
						}px)`;
				} else {
					movieLists[i].style.transform = "translateX(0)";
					clickCounter = 0;
				}
			});

			console.log(Math.floor(window.innerWidth / 270));
		});
	};

	request.send();
}

function getSelectedMovie(movie) {
	var response = "";

	var request = new XMLHttpRequest();

	request.open("GET", "https://f6e5725rxh.execute-api.us-east-1.amazonaws.com/movies/movie-get", true);

	request.setRequestHeader("lambdaauthoriser", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZmZlY3QiOiJzZWNyZXQiLCJpYXQiOjE2NzIxNDQ3ODl9.02LO52OL6NTQs4FCnw6uByNuyvb9d4TRZWibZyvEOO4")

	request.onload = function () {
		response = JSON.parse(request.responseText).Items;

		var movieName

		for (var i = 0; i < response.length; i++) {
			if (movie === response[i].movie) {
				document.getElementById("movie-title").innerHTML = response[i].movie;
				document.getElementById("movie-img").setAttribute("src", response[i].image);
				document.getElementById("movie-genre").innerHTML = '<span class="fa fa-book"></span> ' + response[i].genre;
				document.getElementById("movie-duration").innerHTML = '<span class="fa fa-clock"></span> ' + response[i].duration;
				document.getElementById("movie-rating").innerHTML = '<span class="fa fa-star"></span> ' + response[i].rating;
				document.getElementById("movie-desc").innerHTML = response[i].description;
				document.getElementById("theatre").innerHTML = ""
				// const theatres = response[i].theatres.split(", ")
				// for (const theatre of theatres) {
				// 	document.getElementById("theatre").innerHTML += `<option>${theatre}</option>`
				// }
				movieName = response[i].movie
				const theatres = response[i].theatres.split(",")
				document.getElementById("theatre").innerHTML = theatres


			}
		}
		var userAdmin = sessionStorage.getItem("name")

		document.getElementById("editMovie").addEventListener("click", function() {
			if (sessionStorage.getItem("name") === "admin") {
			fillMovie(movieName);
			}
		})


		document.getElementById("deleteMovie").addEventListener("click", function () {
			if (sessionStorage.getItem("name") === "admin") {
				movieDelete(movieName, userAdmin);
			}
		})


		document.getElementById("bookSeats").addEventListener("click", function () {
			if (sessionStorage.getItem("name") != null) {
				location.href = 'booking.html?movie=' + movieName.replaceAll(" ", "+");
			} else (
				alert('Please register for an account')
			)

		})
	};

	request.send();
}

function movieAdd() {
	var response = "";

	var jsonData = new Object();
	jsonData.movie = document.getElementById("movieName").value;
	jsonData.admin = sessionStorage.getItem("name");
	jsonData.description = document.getElementById("descriptionAdd").value;
	jsonData.genre = document.getElementById("genre").value;
	jsonData.duration = document.getElementById("duration").value;
	jsonData.image = document.getElementById("image").value;
	jsonData.rating = document.getElementById("rating").value;
	jsonData.theatres = document.getElementById("theatreAdd").value;


	var request = new XMLHttpRequest();

	request.open("POST", "https://f6e5725rxh.execute-api.us-east-1.amazonaws.com/movies/movie-add", true);

	request.setRequestHeader("lambdaauthoriser", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZmZlY3QiOiJzZWNyZXQiLCJpYXQiOjE2NzIxNDQ3ODl9.02LO52OL6NTQs4FCnw6uByNuyvb9d4TRZWibZyvEOO4")

	request.onload = function () {
		response = JSON.parse(request.responseText);
		if (response.message == "movie added") {
            alert('Movie has been added successfully');
			$('#addMovie').modal('hide');
			location.reload();
        }
        else {
            alert('Error. Unable to add movie.');
        }



	}
	request.send(JSON.stringify(jsonData));
}

function movieDelete(movie, userAdmin) {
	console.log(movie, userAdmin)
	var response = "";
	
	var request = new XMLHttpRequest();
	
	request.open("DELETE", "https://f6e5725rxh.execute-api.us-east-1.amazonaws.com/movies/movie-delete/" + movie + "/" + userAdmin, true);

    request.setRequestHeader("lambdaauthoriser", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZmZlY3QiOiJzZWNyZXQiLCJpYXQiOjE2NzIxNDQ3ODl9.02LO52OL6NTQs4FCnw6uByNuyvb9d4TRZWibZyvEOO4")
	
	request.onload = function() {
		response = JSON.parse(request.responseText);
		
		if (response.message == "movie deleted") {
			alert('Movie deleted successfully.');
			location.reload();
		}
		else {
			alert('Error. Unable to delete movie.');
		}
	
    };
	
	request.send();
}

function fillMovie(movie) {
	console.log(movie)
	var response = "";

	var request = new XMLHttpRequest();

	request.open("GET", "https://f6e5725rxh.execute-api.us-east-1.amazonaws.com/movies/movie-get", true);

	request.setRequestHeader("lambdaauthoriser", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZmZlY3QiOiJzZWNyZXQiLCJpYXQiOjE2NzIxNDQ3ODl9.02LO52OL6NTQs4FCnw6uByNuyvb9d4TRZWibZyvEOO4")

	request.onload = function () {
		response = JSON.parse(request.responseText).Items;

		for (var i = 0; i < response.length; i++) {
			if (movie === response[i].movie) {
				document.getElementById("movieNameEdit").value = response[i].movie;
				document.getElementById("descriptionEdit").value = response[i].description;
				document.getElementById("genreEdit").value = response[i].genre;
				document.getElementById("durationEdit").value = response[i].duration;
				document.getElementById("imageEdit").value = response[i].image;
				document.getElementById("ratingEdit").value = response[i].rating;
				document.getElementById("theatreEdit").value = response[i].theatres;
			}


		}

	}
	request.send();
}

function movieEdit() {
	var response = "";

    var jsonData = new Object();
    jsonData.movie = document.getElementById("movieNameEdit").value;
	jsonData.admin = sessionStorage.getItem("name");
    jsonData.description = document.getElementById("descriptionEdit").value;
    jsonData.genre = document.getElementById("genreEdit").value;
    jsonData.duration = document.getElementById("durationEdit").value;    
	jsonData.image = document.getElementById("imageEdit").value;    
	jsonData.rating = document.getElementById("ratingEdit").value;    
	jsonData.theatres = document.getElementById("theatreEdit").value;   
    var request = new XMLHttpRequest();

    request.open("PUT", "https://f6e5725rxh.execute-api.us-east-1.amazonaws.com/movies/movie-update", true);

    request.setRequestHeader("lambdaauthoriser", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZmZlY3QiOiJzZWNyZXQiLCJpYXQiOjE2NzIxNDQ3ODl9.02LO52OL6NTQs4FCnw6uByNuyvb9d4TRZWibZyvEOO4")

    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "movie edited") {
            alert('Movie updated successfully.');
			$('#editMovie').modal('hide');
			location.reload();
        }
        else {
            alert('Error. Unable to update movie.');
        }
    };

    request.send(JSON.stringify(jsonData));
}