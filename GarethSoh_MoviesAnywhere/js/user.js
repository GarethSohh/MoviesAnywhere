function register() {
    var response = "";

    var jsonData = new Object();
    jsonData.name = document.getElementById("name").value;
    jsonData.password = document.getElementById("password").value;

    if (jsonData.password != document.getElementById("confirm-password").value) {
        alert('Password and confirm password must be the same!'); return;
    }

    jsonData.email = document.getElementById("email").value;
    jsonData.contactno = document.getElementById("contactno").value;
    jsonData.dob = document.getElementById("dob").value;
    jsonData.gender = 'Male';
    if (document.getElementById('genderFemale').checked) {
        jsonData.gender = 'Female';
    }
    jsonData.role = document.getElementById("role").value;
    if (jsonData.name == "" || jsonData.password == "" || jsonData.email == "" ||
        jsonData.contactno == "" || jsonData.dob == "" || jsonData.gender == "" ||
        jsonData.role == "") {
        alert('All fields are required!'); return;
    }

    var request = new XMLHttpRequest();

    request.open("POST", "https://f6e5725rxh.execute-api.us-east-1.amazonaws.com/users/user-register", true);

    request.setRequestHeader("lambdaauthoriser", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZmZlY3QiOiJzZWNyZXQiLCJpYXQiOjE2NzIxNDQ3ODl9.02LO52OL6NTQs4FCnw6uByNuyvb9d4TRZWibZyvEOO4")

    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "user added") {
            $('#registerForm').modal('hide');
            $('#loginForm').modal('show');
            document.getElementById("loginID").value = document.getElementById("name").value
        }
        else {
            alert('Error. Unable to register user.');
        }
    };
    request.send(JSON.stringify(jsonData));

}

function user_login() {
    var response = "";

    var jsonData = new Object();
    jsonData.name = document.getElementById("loginID").value;
    jsonData.password = document.getElementById("loginPassword").value;

    if (jsonData.name == "" || jsonData.password == "") {
        alert('All fields are required!'); return;
    }

    var request = new XMLHttpRequest();

    request.open("POST", "https://f6e5725rxh.execute-api.us-east-1.amazonaws.com/users/user-login", true);

    request.setRequestHeader("lambdaauthoriser", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZmZlY3QiOiJzZWNyZXQiLCJpYXQiOjE2NzIxNDQ3ODl9.02LO52OL6NTQs4FCnw6uByNuyvb9d4TRZWibZyvEOO4")

    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response.Count);
        if (response.Count == 1 || response.length == 1) {
            if (response.Count == 1) {
                sessionStorage.setItem("name", jsonData.name);
                sessionStorage.setItem("user", JSON.stringify(response.Items[0]));
            }

            $('#loginForm').modal('hide');
            setNavBar();
        }
        else {
            alert('Error. Unable to login.');
        }
    };

    request.send(JSON.stringify(jsonData));
}

function updateProfile() {
    var response = "";

    var jsonData = new Object();
    jsonData.name = document.getElementById("name").value;
    jsonData.password = document.getElementById("password").value;
    jsonData.email = document.getElementById("email").value;
    jsonData.contactno = document.getElementById("contactno").value;    

    if (jsonData.email == "" || jsonData.password == "" || jsonData.contactno == "") {
        alert('All fields are required!'); return;
    }

    var request = new XMLHttpRequest();

    request.open("PUT", "https://f6e5725rxh.execute-api.us-east-1.amazonaws.com/users/user-update", true);

    request.setRequestHeader("lambdaauthoriser", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZmZlY3QiOiJzZWNyZXQiLCJpYXQiOjE2NzIxNDQ3ODl9.02LO52OL6NTQs4FCnw6uByNuyvb9d4TRZWibZyvEOO4")

    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "user edited") {
            alert('Profile updated successfully.');
        }
        else {
            alert('Error. Unable to update profile.');
        }
    };

    request.send(JSON.stringify(jsonData));
}

function deleteMe() {
	
	var response = "";
	
	var request = new XMLHttpRequest();
	
	request.open("DELETE", "https://f6e5725rxh.execute-api.us-east-1.amazonaws.com/users/user-delete/" + sessionStorage.getItem("name"), true);

    request.setRequestHeader("lambdaauthoriser", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZmZlY3QiOiJzZWNyZXQiLCJpYXQiOjE2NzIxNDQ3ODl9.02LO52OL6NTQs4FCnw6uByNuyvb9d4TRZWibZyvEOO4")
	
	request.onload = function() {
		response = JSON.parse(request.responseText);
		
		if (response.message == "user deleted") {
			alert('Account deleted successfully.');
			location.reload();
		}
		else {
			alert('Error. Unable to delete account.');
		}
	
    };
	
	request.send();
    
	sessionStorage.removeItem("name");
	sessionStorage.removeItem("user");
	
	window.location = "index.html"
}
