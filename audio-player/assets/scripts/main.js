console.log("ToDo: List of Songs as Cycle Queue");
console.log("ToDo: Songs img caurusel");
console.log("ToDo: Cash playlist");
console.log("ToDo: add src for songs");
console.log("ToDo: List Randomise");
console.log("ToDo: PlayList Menu");
console.log("ToDo: ability to add new song");
console.log("ToDo: ability play youtube music");
console.log("ToDo: ability send to Alice");

// and assign them to a variable
let nowPlaying = document.querySelector(".now-playing");
let imgTrackArt = document.querySelector(".track-art");
let TrakName = document.querySelector(".track-name");
let TrackArtist = document.querySelector(".track-artist");

let btnPlayPause = document.querySelector(".play-pause");
let btnNext = document.querySelector(".skip-next");
let btnPrev = document.querySelector(".skip-previous");

let progress_slider = document.querySelector(".progress-slider");
let volume_slider = document.querySelector(".volume-slider");
let CurTime = document.querySelector(".current-time");
let Duration = document.querySelector(".total-duration");

// Specify globally used values
let indTrack = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let currentTrack = document.createElement("audio");

// Define the list of tracks that have to be played
let aTrackList = [
  {
    name: "Way to Dream",
    artist: "Keys of Moon Music",
    src: "https://soundcloud.com/keysofmoon",
    image: "./assets/img/WayToDream.jpg",
    path: "./assets/media/Way to Dream - Inspiring Piano and Strings (Keys Of Moon Music)(mp3).mp3",
    nex: 1,
  },
  {
    name: "White Petals",
    artist: "Keys of Moon Music",
    src: "https://soundcloud.com/keysofmoon",
    image: "./assets/img/white-petals.jpg",
    path: "./assets/media/keys-of-moon-white-petals.mp3",
    nex: 2,
  },
  {
    name: "Canon in D Major",
    artist: "Kevin MacLeod",
    src: "",
    image: "https://picsum.photos/200",
    path: "./assets/media/Kevin_MacLeod_-_Canon_in_D_Major.mp3",
    nex: 0,
  },
];

function loadTrack(indTrack) {
  // Clear the previous slider timer
  clearInterval(updateTimer);
  resetValues();

  // Load a new track
  currentTrack.src = aTrackList[indTrack].path;
  currentTrack.load();

  // Update details of the track
  imgTrackArt.style.backgroundImage =
    "url(" +
    aTrackList[indTrack].image +
    "),\n\tradial-gradient(circle, #dedbff, #c5e1ff, #b1e7fc, #abeaec, #b5ead7)";
  TrakName.textContent = aTrackList[indTrack].name;
  TrackArtist.textContent = aTrackList[indTrack].artist;
  /*   nowPlaying.textContent =
    "PLAYING " + (indTrack + 1) + " OF " + aTrackList.length; */

  // Set an interval of 1000 milliseconds
  // for updating the slider
  updateTimer = setInterval(sliderUpdate, 1000);
  currentTrack.addEventListener("ended", skipNext);
}

function resetValues() {
  CurTime.textContent = "00:00";
  Duration.textContent = "00:00";
  progress_slider.value = 0;
}

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  currentTrack.play();
  isPlaying = true;
  btnPlayPause.textContent = "pause_circle_filled";
}

function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  btnPlayPause.textContent = "play_circle_filled";
}

function skipNext() {
  if (indTrack < aTrackList.length - 1) indTrack += 1;
  else indTrack = 0;
  loadTrack(indTrack);
  playTrack();
}

function skipPrevious() {
  if (indTrack > 0) indTrack -= 1;
  else indTrack = aTrackList.length;
  loadTrack(indTrack);
  playTrack();
}

function slideTo() {
  let slideTo = currentTrack.duration * (progress_slider.value / 100);
  currentTrack.currentTime = slideTo;
}

function setVolume(n) {
  volume_slider.stepUp(n);
  volume_slider.style.setProperty("--grad-thumb", volume_slider.value + "%");
  currentTrack.volume = volume_slider.value / 100;
  localStorage.setItem("lidaChk-player-volume", volume_slider.value);
}

function sliderUpdate() {
  let sliderPosition = 0;

  if (!isNaN(currentTrack.duration)) {
    sliderPosition = currentTrack.currentTime * (100 / currentTrack.duration);
    progress_slider.value = sliderPosition;
    progress_slider.style.setProperty(
      "--grad-thumb",
      progress_slider.value + "%"
    );

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(currentTrack.currentTime / 60);
    let currentSeconds = Math.floor(
      currentTrack.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(currentTrack.duration / 60);
    let durationSeconds = Math.floor(
      currentTrack.duration - durationMinutes * 60
    );

    // Add a zero to the single digit time values
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    // Display the updated duration
    CurTime.textContent = currentMinutes + ":" + currentSeconds;
    Duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

//load VolumeLevel
function InitFromLocalStorage() {
  if (!localStorage.getItem("lidaChk-player-volume"))
  localStorage.setItem("lidaChk-player-volume", 99);
  volume_slider.value = localStorage.getItem("lidaChk-player-volume");
  volume_slider.style.setProperty("--grad-thumb", volume_slider.value + "%");
  currentTrack.volume = volume_slider.value / 100;
}

InitFromLocalStorage();
loadTrack(indTrack);
