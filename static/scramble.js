// function scrambleTitle() {
//   var titleElement = document.querySelector(".name");
//   var title = titleElement.innerText;
//   var scrambledTitle = scrambleString(title);
//   var currentIndex = 0;
//   titleElement.innerText = "";

//   var interval = setInterval(function () {
//     if (currentIndex >= scrambledTitle.length) {
//       clearInterval(interval);
//       titleElement.innerText = title; // Restore the original title
//     } else {
//       var currentLetter = scrambledTitle[currentIndex];
//       titleElement.innerText += currentLetter;
//       currentIndex++;
//     }
//   }, 100); // Delay between each letter (adjust as desired)

//   function scrambleString(str) {
//     var scrambledStr = "";
//     var chars = str.split("");

//     while (chars.length > 0) {
//       var randomIndex = Math.floor(Math.random() * chars.length);
//       var randomChar = chars.splice(randomIndex, 1)[0];
//       scrambledStr += randomChar;
//     }

//     return scrambledStr;
//   }
// }
function writeTitle() {
  var titleElement = document.querySelector(".name");
  var title = titleElement.innerText;
  var currentIndex = 0;
  var writingInterval;
  var cursorInterval;
  titleElement.innerText = "";
  titleElement.style.borderRight = "2px solid"; // Add a blinking cursor effect

  cursorInterval = setInterval(function () {
    titleElement.style.borderRightColor =
      titleElement.style.borderRightColor === "transparent"
        ? "currentColor"
        : "transparent";
  }, 500); // Blinking cursor interval (adjust as desired)

  writingInterval = setInterval(function () {
    if (currentIndex >= title.length) {
      clearInterval(writingInterval);
      clearInterval(cursorInterval);
      titleElement.style.borderRight = "none"; // Remove the cursor effect

      // Blink the cursor twice after text writing is complete
      var blinkCount = 0;
      var blinkInterval = setInterval(function () {
        if (blinkCount >= 4) {
          clearInterval(blinkInterval);
        } else {
          titleElement.style.borderRightColor =
            titleElement.style.borderRightColor === "transparent"
              ? "currentColor"
              : "transparent";
          blinkCount++;
        }
      }, 250); // Interval between cursor blinks (adjust as desired)
    } else {
      var currentChar = title[currentIndex];
      titleElement.innerText += currentChar;
      currentIndex++;
    }
  }, 150); // Delay between each character (adjust as desired)
}

writeTitle();
