var specVis4 = "json/oil_consumption.vg.json";

let year = 1965;
let timer;
let isPaused = false;

// Function to update the year in the visualization
function updateYear(view, newYear) {
  view.signal('Year_selection', newYear).run();  // Update the "Year_selection" signal dynamically
}

// Function to toggle the pause and resume of the animation
function toggleAnimation(view) {
  const button = document.getElementById("pauseButton");
  
  if (isPaused) {
    // Resume the animation
    timer = setInterval(() => {
      if (year < 2023) {
        year += 1;
      } else {
        year = 1965;  // Loop back to 1991 when it reaches 2020
      }
      updateYear(view, year);
    }, 200);  // Change the year every 1000ms
    button.textContent = "Pause";  // Change button text to Pause
  } else {
    // Pause the animation
    clearInterval(timer);  // Stop the interval
    button.textContent = "Resume";  // Change button text to Resume
  }

  isPaused = !isPaused;  // Toggle the pause state
}

// Embed the Vega-Lite visualization
vegaEmbed("#oil_consumption", specVis4, {"actions": false}).then(function(result) {
  const view = result.view;

  // Start the automated animation
  timer = setInterval(() => {
    if (year < 2023) {
      year += 1;
    } else {
      year = 1965;  // Loop back to 1991 when it reaches 2020
    }
    updateYear(view, year);
  }, 200);  // Change the year every 1000ms (adjust the speed if needed)

  // Add event listener to the button to toggle the pause and resume
  document.getElementById("pauseButton").addEventListener("click", () => {
    toggleAnimation(view);
  });

}).catch(console.error);