

//TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar,.sidebar,.left-menu-icon,.toggle,.menu-list"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

function setNavBar() {
	if (sessionStorage.getItem("name") == null && sessionStorage.getItem("email") == null) {
		document.getElementById("navUser").innerHTML = '<a class="nav-link" href="#" data-toggle="modal" data-target="#loginForm"><i class="fa fa-sharp fa-right-to-bracket"></i> Login</a>'
	} else if (sessionStorage.getItem("name") != null) {
		document.getElementById("navUser").innerHTML = '<a class="nav-link" href="user.html"><i class="fa fa-sharp fa-user"></i>' + sessionStorage.getItem("name") + '</a>'
	} else if (sessionStorage.getItem("email") != null) {
		document.getElementById("navUser").innerHTML = '<a class="nav-link" href="company.html"><i class="fa fa-sharp fa-building"></i> Company admin</a>'
	}
}

const adminButton = document.getElementById("admin");
const adminButton1 = document.getElementById("deleteMovie");
if(sessionStorage.getItem("name") === "admin") {
	adminButton.style.display = "block"
	adminButton1.style.display = "block"
} else {
	adminButton.style.display = "none";
}



function showPass() {
  var x = document.getElementById("loginPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function login() {
	if (document.getElementById("loginLabelID").innerHTML == "Name") {
		user_login();
	} else {
		console.log("fail")
	}
}

function logOut() {
	sessionStorage.removeItem("name");
	sessionStorage.removeItem("user");
	
	window.location = "index.html"
}

function fillProfile() {
	if (sessionStorage.getItem("name") != null) {
		var jsonData = JSON.parse(sessionStorage.getItem("user"));
		document.getElementById("name").value = jsonData.name;
		document.getElementById("password").value = jsonData.password;
		document.getElementById("email").value = jsonData.email;
		document.getElementById("contactno").value = jsonData.contactno;
		document.getElementById("dob").value = jsonData.dob;

		if (jsonData.gender == 'Male') {
		  document.getElementById("genderMale").setAttribute("checked", true);
		}
		else  {
			document.getElementById("genderFemale").setAttribute("checked", true);
		}
		document.getElementById("role").value = jsonData.role;
	}
}