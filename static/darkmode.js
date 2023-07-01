// Check user's preferred mode and apply it on page load
document.addEventListener("DOMContentLoaded", function () {
  var body = document.body;
  var preferredMode = localStorage.getItem("mode");

  // Prevent flash of content by initially hiding the body
  body.style.visibility = "hidden";

  // Apply preferred mode after the body is hidden
  if (preferredMode === "dark") {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }

  // Show the body after applying the preferred mode
  body.style.visibility = "visible";
});

// Function that will switch the theme based on the if the theme toggle is checked or not
function toggleDarkMode() {
  var body = document.body;
  var currentMode = localStorage.getItem("mode");

  if (currentMode === "dark") {
    body.classList.remove("dark-mode");
    localStorage.setItem("mode", "light");
  } else {
    body.classList.add("dark-mode");
    localStorage.setItem("mode", "dark");
  }
}
