// Elements
const player = document.querySelector(".player");
const video = document.querySelector(".player_video");
const button = document.querySelector(".player_button");
const skipButtons = document.querySelectorAll("[data-skip]");
const slider = document.querySelectorAll(".player_slider");
const progressBar = document.querySelector(".progress_bar");
const progress = document.querySelector(".progress");
const fullscreenButton = document.getElementById("fullscreenbutton");

// Functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  let icon;
  if (this.paused) {
    icon = "►";
  } else {
    icon = "▌▐";
  }
  button.textContent = icon;
}

function skip() {
  const skipValue = parseFloat(this.dataset.skip);
  video.currentTime += skipValue;
}

function updateSlider() {
  video[this.name] = this.value;
}

function updateProgressBar() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function moveProgressBar(e) {
  const clickBar = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = clickBar;
}

// Event Listeners
video.addEventListener("click", togglePlay);
button.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

skipButtons.forEach((button) => button.addEventListener("click", skip));

slider.forEach((slider) => slider.addEventListener("change", updateSlider));
slider.forEach((slider) => slider.addEventListener("mousemove", updateSlider));

video.addEventListener("timeupdate", updateProgressBar);

let mousedown = false;
progress.addEventListener("click", moveProgressBar);
progress.addEventListener("mousemove", (e) => mousedown && moveProgressBar(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

fullscreenButton.addEventListener("click", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    video.requestFullscreen();
  }
});
