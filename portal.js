// Simple demo users
const users = [
  { username: "student1", password: "1234" },
  { username: "student2", password: "abcd" }
];

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    document.querySelector(".portal-login").style.display = "none";
    document.querySelector(".dashboard").style.display = "block";
  } else {
    errorMsg.textContent = "Incorrect username or password.";
  }
}

function logout() {
  document.querySelector(".dashboard").style.display = "none";
  document.querySelector(".portal-login").style.display = "block";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("errorMsg").textContent = "";
}
